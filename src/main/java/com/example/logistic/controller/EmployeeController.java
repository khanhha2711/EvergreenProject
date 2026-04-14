package com.example.logistic.controller;

import com.example.logistic.DTO.EmployeeDTO.EmployeeRespDTO;
import com.example.logistic.DTO.EmployeeDTO.ListDTO;
import com.example.logistic.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private IEmployeeService employeeService;

    @GetMapping("")
    public List<ListDTO> showList(@RequestParam (name="search" ,required = false) String search){
        if(search==null || search.isEmpty()){
            return  employeeService.findAll();
        }
        return employeeService.findByName(search);
    }

    @PostMapping("/create")
    public EmployeeRespDTO createEmployee(@RequestBody EmployeeRespDTO dto){
        return employeeService.createEmployee(dto);
    }

    @GetMapping("/detail/{employeeCode}")
    public EmployeeRespDTO detailEmployee(@PathVariable (name="employeeCode") String employeeCode){
        return employeeService.detailEmployee(employeeCode);
    }

    @PutMapping("/update/{employeeCode}")
    public EmployeeRespDTO updateEmployee(@PathVariable (name="employeeCode") String employeeCode,
                                          @RequestBody EmployeeRespDTO dto){
        return employeeService.update(employeeCode,dto);
    }

    @DeleteMapping("/delete/{employeeCode}")
    public String deleteEmployee(@PathVariable (name="employeeCode") String employeeCode){
        employeeService.detailEmployee(employeeCode);
        return "Employee deleted successfully";
    }
}
