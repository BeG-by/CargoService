package by.itechart.cargo.mail;

import by.itechart.cargo.service.SendMailService;
import lombok.extern.slf4j.Slf4j;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@DisallowConcurrentExecution
public class SendMailJob implements Job {

    private SendMailService mailService;

    @Autowired
    public SendMailJob(SendMailService mailService) {
        this.mailService = mailService;
    }

    @Override
    public void execute(JobExecutionContext context) {
        log.info("Job ** {} ** starting @ {}",
                context.getJobDetail().getKey().getName(), context.getFireTime());
        mailService.sendBirthdayMail();
        log.info("Job ** {} ** completed.  Next job scheduled @ {}",
                context.getJobDetail().getKey().getName(), context.getNextFireTime());
    }
}

