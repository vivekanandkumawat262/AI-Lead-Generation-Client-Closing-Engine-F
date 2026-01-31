def classify_intent(text: str) -> str:
    text = text.lower()

    if any(word in text for word in ["yes", "interested", "sure", "let's talk"]):
        return "INTERESTED"

    if any(word in text for word in ["no", "not interested", "stop"]):
        return "NOT_INTERESTED"

    if any(word in text for word in ["maybe", "later", "not now"]):
        return "MAYBE"

    return "UNKNOWN"
