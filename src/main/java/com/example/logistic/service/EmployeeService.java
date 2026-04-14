package com.example.logistic.service;

import com.example.logistic.DTO.EmployeeDTO.EmployeeRespDTO;
import com.example.logistic.DTO.EmployeeDTO.ListDTO;
import com.example.logistic.entity.Accounts;
import com.example.logistic.entity.Employees;
import com.example.logistic.entity.Users;
import com.example.logistic.repository.IAccountRepository;
import com.example.logistic.repository.IEmployeeRepository;
import com.example.logistic.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService implements IEmployeeService{
    @Autowired
    private IEmployeeRepository employeeRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IAccountRepository accountRepository;

    @Override
    public List<ListDTO> findAll() {
        return employeeRepository.findAll()
                .stream()
                .map(this::mapToListDTO)
                .toList();
    }

    private ListDTO mapToListDTO(Employees employees) {
        ListDTO dto= new ListDTO();
        dto.setEmployeeCode(employees.getEmployeeCode());
        dto.setEmployeeName(employees.getUser().getUserName());
        dto.setEmployeePhone(employees.getUser().getUserPhone());
        String gmail=accountRepository.findByUserId(employees.getUser())
                .map(acc -> acc.getGmail())
                .orElse("");
        dto.setGmail(gmail);
        dto.setRoleName(employees.getPosition());
        dto.setDepartment(employees.getDepartment());
        return dto;
    }

    @Override
    public EmployeeRespDTO createEmployee(EmployeeRespDTO dto) {

        Accounts accounts= accountRepository.findByGmail(dto.getGmail());
        if(accounts==null){
            throw new RuntimeException("Gmail not found in accounts");
        }
        Employees emp= new Employees();
        emp.setUser(accounts.getUserId());
        emp.setDepartment(dto.getDepartment());
        emp.setPosition(dto.getPosition());
        Employees save= employeeRepository.save(emp);

        EmployeeRespDTO resp= new EmployeeRespDTO();
        resp.setEmployeeCode(save.getEmployeeCode());
        resp.setEmployeeName(save.getUser().getUserName());
        resp.setDepartment(save.getDepartment());
        resp.setPosition(save.getPosition());
        resp.setGmail(accounts.getGmail());
        resp.setPhone(save.getUser().getUserPhone());
        return resp;

    }

    @Override
    public EmployeeRespDTO detailEmployee(String employeeCode) {
        Employees employees =employeeRepository.findByEmployeeCode(employeeCode);
        EmployeeRespDTO dto= new EmployeeRespDTO();
        dto.setEmployeeCode(employees.getEmployeeCode());
        dto.setEmployeeName(employees.getUser().getUserName());
        dto.setDepartment(employees.getDepartment());
        dto.setPosition(employees.getPosition());
        String gmail= accountRepository.findByUserId(employees.getUser())
                .map(Accounts :: getGmail)
                .orElse("");
        dto.setGmail(gmail);
        return dto;
    }

    @Override
    public EmployeeRespDTO update(String employeeCode, EmployeeRespDTO dto) {

        Employees emp = employeeRepository.findByEmployeeCode(employeeCode);

        if (dto.getDepartment() != null) emp.setDepartment(dto.getDepartment());
        if (dto.getPosition() != null) emp.setPosition(dto.getPosition());

        Employees saved = employeeRepository.save(emp);

        EmployeeRespDTO resp = new EmployeeRespDTO();
        resp.setEmployeeCode(saved.getEmployeeCode());
        resp.setEmployeeName(saved.getUser().getUserName());
        resp.setDepartment(saved.getDepartment());
        resp.setPosition(saved.getPosition());

        String gmail = accountRepository.findByUserId(saved.getUser())
                .map(Accounts::getGmail)
                .orElse("");
        resp.setGmail(gmail);
        resp.setPhone(saved.getUser().getUserPhone());

        return resp;
    }

    @Override
    public void delete(String employeeCode) {
        Employees emp = employeeRepository.findByEmployeeCode(employeeCode);
        employeeRepository.delete(emp);

    }

    @Override
    public List<ListDTO> findByName(String employeeName) {
        return employeeRepository.findByUser_UserNameContainingIgnoreCase(employeeName)
                .stream()
                .map(this::mapToListDTO)
                .toList();
    }
}
