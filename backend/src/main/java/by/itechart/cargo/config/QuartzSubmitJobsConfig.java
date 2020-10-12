package by.itechart.cargo.config;

import by.itechart.cargo.mail.SendMailJob;
import org.quartz.JobDetail;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;

@Configuration
public class QuartzSubmitJobsConfig {
    private static final String CRON_EVERY_DAY_AT_NINE = "0 53 8 * * ?";

    @Bean(name = "birthdayMail")
    public JobDetailFactoryBean jobBirthdayMail() {
        return QuartzConfig.createJobDetail(SendMailJob.class, "Send Birthday Mail Job");
    }

    @Bean(name = "birthdayMailTrigger")
    public CronTriggerFactoryBean triggerBirthdayMail(@Qualifier("birthdayMail") JobDetail jobDetail) {
        return QuartzConfig.createCronTrigger(jobDetail,
                CRON_EVERY_DAY_AT_NINE, "Send Birthday Mail Trigger");
    }

}
