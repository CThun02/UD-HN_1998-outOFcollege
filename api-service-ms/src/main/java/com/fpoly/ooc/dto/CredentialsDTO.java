package com.fpoly.ooc.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CredentialsDTO {
    private String login;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private char[] password;
}
