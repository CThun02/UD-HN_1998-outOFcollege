package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.EmailDetails;

public interface EmailService {

    String sendSimpleMail(EmailDetails details, Long idVoucher);

    String sendMailWithAttachment(EmailDetails details, Long idVoucher);

    String sendSimpleMail(EmailDetails details);

}
