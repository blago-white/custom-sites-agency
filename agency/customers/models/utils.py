import random


def generate_random_email_code() -> int:
    return random.randint(10_000, 20_000)
