package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.common.Commons;
import com.fpoly.ooc.dto.EmailDetails;
import com.fpoly.ooc.repository.VoucherRepository;
import com.fpoly.ooc.service.interfaces.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.concurrent.CompletableFuture;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private VoucherRepository voucherRepository;

    @Value(value = "${spring.mail.username}")
    private String sender;

    @Override
    @Async
    public CompletableFuture<String> sendSimpleMail(EmailDetails details, Long idVoucher) {

        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

            for (String recipient : details.getRecipient()) {

                if (voucherRepository.isCheckAccountOwnerVoucher(idVoucher, Commons.lower(recipient))) {
                    continue;
                }

                //setup a mail basic
                simpleMailMessage.setFrom(sender);
                simpleMailMessage.setTo(recipient);
                simpleMailMessage.setText(details.getMessageBody());
                simpleMailMessage.setSubject(details.getSubject());

                javaMailSender.send(simpleMailMessage);
            }

            return CompletableFuture.completedFuture("DONE");
        } catch (Exception e) {
            return CompletableFuture.completedFuture("ERROR");
        }
    }

    @Override
    public String sendMailWithAttachment(EmailDetails details, Long idVoucher) {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            for (String recipient : details.getRecipient()) {
                mimeMessageHelper.setFrom(sender);
                mimeMessageHelper.setTo(recipient);
                mimeMessageHelper.setText(details.getMessageBody());
                mimeMessageHelper.setSubject(details.getSubject());

                // them tep dinh kem
                FileSystemResource file = new FileSystemResource(new File(details.getAttachment()));

                mimeMessageHelper.addAttachment(file.getFilename(), file);

                // gui mail
                javaMailSender.send(mimeMessage);
            }

            return "DONE";
        } catch (MessagingException e) {
            return "ERROR";
        }
    }

    @Override
    public String sendSimpleMail(EmailDetails details){

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            for (String recipient : details.getRecipient()) {
                helper.setFrom(sender);
                helper.setTo(recipient);
                helper.setSubject(details.getSubject());
                helper.setText(details.getMessageBody(), true);
                javaMailSender.send(message);
            }

            return "DONE";
        } catch (Exception e) {
            return "ERROR";
        }
    }

}
