package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.EmailDetails;

public interface EmailService {

    String sendSimpleMail(EmailDetails details);

    String sendMailWithAttachment(EmailDetails details);

}
