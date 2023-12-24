package com.fpoly.ooc.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class NotFoundException extends Exception {

    private String field;
    private HttpStatus status;

    public NotFoundException(String message) {
        super(message);
        this.status = HttpStatus.BAD_REQUEST;
    }

    public NotFoundException(String message, String field) {
        super(message);
        this.field = field;
        this.status = HttpStatus.BAD_REQUEST;
    }

    public NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

}
