import logging
import colorlog


def setup_logger():
    handler = colorlog.StreamHandler()

    handler.setFormatter(
        colorlog.ColoredFormatter(
            "%(log_color)s%(levelname)s | %(message)s",
            log_colors={
                "DEBUG": "cyan",
                "INFO": "green",
                "WARNING": "yellow",
                "ERROR": "red",
                "CRITICAL": "bold_red",
            },
        )
    )

    logger = logging.getLogger("medintel")

    if not logger.handlers:
        logger.setLevel(logging.INFO)
        logger.addHandler(handler)

    return logger


logger = setup_logger()