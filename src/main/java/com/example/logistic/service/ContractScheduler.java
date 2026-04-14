package com.example.logistic.service;

import com.example.logistic.repository.IContractRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
public class ContractScheduler {
    private static final Logger log = LoggerFactory.getLogger(ContractScheduler.class);
    @Autowired
    private IContractRepository contractRepository;

    @Scheduled(cron = "0 0 1 * * ?")
    @Transactional
    public void updateExpiredContracts() {
        LocalDate today = LocalDate.now();

        log.info("Bắt đầu cập nhật hợp đồng hết hạn - Ngày hiện tại: {}", today);

        int updatedCount = contractRepository.updateStatusToDoneForExpired(today);

        log.info("Đã cập nhật {} hợp đồng thành trạng thái 'Done'", updatedCount);
    }
}
