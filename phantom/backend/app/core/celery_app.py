import os
from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "phantom_worker",
    broker=settings.redis_url,
    backend=settings.redis_url
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    # Prevent tasks from being treated as failed due to soft time limits
    task_soft_time_limit=600,
    task_time_limit=900,
    # Improve result backend behaviour
    result_expires=3600,
    # Worker settings for Windows compatibility
    worker_pool="solo",  # solo pool avoids multiprocessing issues on Windows
    imports=("app.tasks.scanner_tasks",),
)
