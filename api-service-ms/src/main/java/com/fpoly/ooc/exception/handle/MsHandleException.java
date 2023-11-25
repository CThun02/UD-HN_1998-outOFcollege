package com.fpoly.ooc.exception.handle;

import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.ErrorDTO;
import com.fpoly.ooc.exception.ErrorMessageResponse;
import com.fpoly.ooc.exception.LoginException;
import com.fpoly.ooc.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class MsHandleException {

    @ExceptionHandler
    public ResponseEntity<Map<String, String>> handleArgumentException(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        BindingResult bindingResult = ex.getBindingResult();
        List<FieldError> fieldErrorList = bindingResult.getFieldErrors();

        for (FieldError message : fieldErrorList) {
            errors.put(message.getField(), message.getDefaultMessage());
        }

        errors.put("message", "Vui lòng nhập đúng kiểu dữ liệu");

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

//    @ExceptionHandler
//    public ResponseEntity<ErrorMessageResponse> notFoundExceptionMessage(NotFoundException ex) {
//
//        return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, ex.getMessage()), HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<Map<String, Object>> notFoundException(NotFoundException ex) {
        Map<String, Object> errors = new HashMap<>();
        errors.put("status", Const.HTTP_ERROR_CODE);
        errors.put("message", ex.getMessage());
        errors.put(ex.getField(), ex.getMessage());

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorMessageResponse> dateTimeParseException(DateTimeParseException ex) {

        return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = { LoginException.class })
    @ResponseBody
    public ResponseEntity<ErrorDTO> handleException(LoginException ex) {
        return ResponseEntity
                .status(ex.getStatus())
                .body(ErrorDTO.builder().message(ex.getMessage()).build());
    }

    @ExceptionHandler(value = {TokenExpiredException.class})
    public ResponseEntity<ErrorDTO> handleJWTException(TokenExpiredException ex) {
        return ResponseEntity
                .status(409)
                .body(
                        ErrorDTO.builder()
                                .message(ErrorCodeConfig.getMessage(Const.JWT_EXCEPTION)
                                ).build());
    }
    @ExceptionHandler(value = {JWTDecodeException.class})
    public ResponseEntity<ErrorDTO> handleJWTDecodeException(JWTDecodeException ex) {
        return ResponseEntity
                .status(409)
                .body(
                        ErrorDTO.builder()
                                .message(ErrorCodeConfig.getMessage(Const.JWT_EXCEPTION)
                                ).build());
    }
//TokenExpiredException
}
