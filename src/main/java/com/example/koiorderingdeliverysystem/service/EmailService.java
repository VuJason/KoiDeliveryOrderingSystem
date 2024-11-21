package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.dto.EmailDetail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    TemplateEngine templateEngine;

    @Autowired
    JavaMailSender javaMailSender;

    public void sendEmail(EmailDetail emailDetail) {
        try {
            Context context = new Context();
//            context.setVariable("name", emailDetail.getReceiver().getEmail());
//            context.setVariable("button", "Go to home page");
//            context.setVariable("Link", emailDetail.getLink());
            context.setVariable("title", "Welcome!" + emailDetail.getReceiver().getEmail());
            context.setVariable("mainMessage", "Thank you for joining us. We're excited to have you on board!");
            context.setVariable("actionUrl", "https://www.google.com/");
            context.setVariable("actionText", "Get Started");
            String template = templateEngine.process("email-template", context);

            //Creating a simple mail message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

            // Setting  up necessary details
            mimeMessageHelper.setFrom("koideliveryordering@gmail.com");
            mimeMessageHelper.setTo(emailDetail.getReceiver().getEmail());
            mimeMessageHelper.setText(template, true);
            mimeMessageHelper.setSubject(emailDetail.getSubject());

            javaMailSender.send(mimeMessage);
        }catch (MessagingException e) {
            System.out.println("ERROR SENT MAIL!!");
        }


    }

}
