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

    public void sendEmail(EmailDetail emailDetail, String emailType) {
        try {
            Context context = new Context();
            String template = "";

            if("registration".equals(emailType)) {
                context.setVariable("title", "Welcome!" + emailDetail.getReceiver().getEmail());
                context.setVariable("mainMessage", "Thank you for joining us. We're excited to have you on board!");
                context.setVariable("actionUrl", "http://localhost:5173/");
                context.setVariable("actionText", "Get Started");
                template = templateEngine.process("email-template", context);
            }else if("orderCancellation".equals(emailType)) {
                context.setVariable("title", "Order Cancellation Notification");
                context.setVariable("customerName", emailDetail.getReceiver().getEmail());
                context.setVariable("mainMessage", "Your order has been cancelled. ");
                context.setVariable("reason", emailDetail.getReason());
//                context.setVariable("orderCreatedDate", emailDetail.getCreateOrder());
                context.setVariable("actionUrl", "http://localhost:5173/browser-track");
                context.setVariable("actionText", "View Orders");
                context.setVariable("companyName", "KoiDelivery");
                context.setVariable("companyAddress", "566 Vo Van Ngan Street, HCM City, VietNam");
                template = templateEngine.process("cancel-template", context);
            }else {
                throw new MessagingException("Invalid Email Type");
            }


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
