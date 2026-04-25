package com.example.logistic.service;

import com.example.logistic.DTO.EmployeeDTO.EmployeeRespDTO;
import com.example.logistic.DTO.EmployeeDTO.ListDTO;
import com.example.logistic.entity.Accounts;
import com.example.logistic.entity.Employees;
import com.example.logistic.entity.Users;
import com.example.logistic.repository.IAccountRepository;
import com.example.logistic.repository.IEmployeeRepository;
import com.example.logistic.repository.IUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService implements IEmployeeService{
    @Autowired
    private IEmployeeRepository employeeRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IAccountRepository accountRepository;

    @Override
    public List<EmployeeRespDTO> findAll() {
        return employeeRepository.findAll()
                .stream()
                .map(this::mapToListDTO)
                .toList();
    }

    private EmployeeRespDTO mapToListDTO(Employees employees) {
        EmployeeRespDTO dto= new EmployeeRespDTO();
        dto.setEmployeeCode(employees.getEmployeeCode());
        dto.setEmployeeName(employees.getUser().getUserName());
        dto.setEmployeePhone(employees.getUser().getUserPhone());
        String gmail=accountRepository.findByUserId(employees.getUser())
                .map(acc -> acc.getGmail())
                .orElse("");
        dto.setGmail(gmail);
        dto.setPosition(employees.getPosition());
        dto.setDepartment(employees.getDepartment());
        return dto;
    }

    @Override
    public EmployeeRespDTO createEmployee(ListDTO dto) {

        Accounts accounts= accountRepository.findByGmail(dto.getGmail());
        if(accounts!=null){
            throw new RuntimeException("Gmail already existed.");
        }
        Users users= new Users();
        users.setUserName(dto.getEmployeeName());
        users.setUserPhone(dto.getEmployeePhone());
        users.setCreateAt(LocalDate.now());
        users.setUserAddress("NULL");
        users.setUserStatus("NATIVE");
        Users saves= userRepository.save(users);

        Accounts accounts1= new Accounts();
        accounts1.setUserId(saves);
        accounts1.setGmail(dto.getGmail());
        accounts1.setPassword("123456789");
        accountRepository.save(accounts1);

        Employees emp= new Employees();
        emp.setUser(saves);
        emp.setDepartment(dto.getDepartment());
        emp.setPosition(dto.getPosition());
        Employees save= employeeRepository.save(emp);

        EmployeeRespDTO resp= new EmployeeRespDTO();
        resp.setEmployeeCode(save.getEmployeeCode());
        resp.setEmployeeName(saves.getUserName());
        resp.setDepartment(save.getDepartment());
        resp.setPosition(save.getPosition());
        resp.setGmail(accounts1.getGmail());
        resp.setEmployeePhone(saves.getUserPhone());
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
        dto.setEmployeePhone(employees.getUser().getUserPhone());
        return dto;
    }

    @Override
    @Transactional
    public EmployeeRespDTO update(String employeeCode, ListDTO dto) {

        Employees emp = employeeRepository.findByEmployeeCode(employeeCode);
        if(emp == null){
            throw new RuntimeException("Not found");
        }
        Users user = emp.getUser();
        if (user == null) {
            throw new RuntimeException("The employee has no user yet.");
        }
        if (dto.getEmployeeName() != null && !dto.getEmployeeName().isBlank()) {
            user.setUserName(dto.getEmployeeName());
        }

        if (dto.getEmployeePhone() != null && !dto.getEmployeePhone().isBlank()) {
            user.setUserPhone(dto.getEmployeePhone());
        }

        if (dto.getDepartment() != null && !dto.getDepartment().isBlank()) {
            emp.setDepartment(dto.getDepartment());
        }

        if (dto.getPosition() != null && !dto.getPosition().isBlank()) {
            emp.setPosition(dto.getPosition());
        }


        if (dto.getGmail() != null && !dto.getGmail().isBlank()) {
            Accounts acc = accountRepository.findByUserId_Id(user.getId())
                    .orElseThrow(() -> new RuntimeException("Account not found"));

            Optional<Accounts> existing = accountRepository.findByGmailAndIdNot(dto.getGmail(),acc.getAccountId());
            if (existing.isPresent()) {
                throw new RuntimeException("Gmail already exists with another account.");
            }

            acc.setGmail(dto.getGmail());
        }


        Employees saved = employeeRepository.save(emp);


        EmployeeRespDTO resp = new EmployeeRespDTO();
        resp.setEmployeeCode(saved.getEmployeeCode());
        resp.setEmployeeName(saved.getUser().getUserName());
        resp.setDepartment(saved.getDepartment());
        resp.setPosition(saved.getPosition());
        resp.setEmployeePhone(saved.getUser().getUserPhone());

        String gmail = accountRepository.findByUserId(saved.getUser())
                .map(Accounts::getGmail)
                .orElse("");
        resp.setGmail(gmail);

        return resp;
    }

    @Override
    public void delete(String employeeCode) {
        Employees emp = employeeRepository.findByEmployeeCode(employeeCode);
        employeeRepository.delete(emp);

    }

    @Override
    public List<EmployeeRespDTO> findByName(String employeeName) {
        return employeeRepository.findByUser_UserNameContainingIgnoreCase(employeeName)
                .stream()
                .map(this::mapToListDTO)
                .toList();
    }
}
