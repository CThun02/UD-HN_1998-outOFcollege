package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.EmailDetails;

import java.util.concurrent.CompletableFuture;

public interface EmailService {

    CompletableFuture<String> sendSimpleMail(EmailDetails details, Long idVoucher);

    String sendMailWithAttachment(EmailDetails details, Long idVoucher);

    String sendSimpleMail(EmailDetails details);

}
