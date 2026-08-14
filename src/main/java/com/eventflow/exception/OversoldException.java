package com.eventflow.exception;

public class OversoldException extends RuntimeException {
    public OversoldException(String message) {
        super(message);
    }
}
