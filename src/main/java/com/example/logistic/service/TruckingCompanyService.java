package com.example.logistic.service;

import com.example.logistic.DTO.TruckingCompanyDTO.CreateDTO;
import com.example.logistic.DTO.TruckingCompanyDTO.ListDTO;
import com.example.logistic.DTO.TruckingCompanyDTO.ResponeSearchDTO;
import com.example.logistic.entity.TruckingCompany;
import com.example.logistic.repository.ITruckingCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TruckingCompanyService implements ITruckingCompanyService {
    @Autowired
    private ITruckingCompanyRepository truckingCompanyRepository;

    @Override
    public List<ListDTO> findAll() {
        return truckingCompanyRepository.findAll()
                .stream()
                .map(this:: mapToListDTO)
                .toList();
    }

    private ListDTO mapToListDTO(TruckingCompany truckingCompany) {
        ListDTO dto= new ListDTO();
        dto.setCompanyCode(truckingCompany.getCompanyCode());
        dto.setCompanyName(truckingCompany.getCompanyName());
        dto.setCompanyPhone(truckingCompany.getCompanyPhone());
        dto.setCompanyGmail(truckingCompany.getCompanyGmail());
        dto.setCompanyAddress(truckingCompany.getCompanyAddress());
        return dto;
    }

    @Override
    public ListDTO createTrucking(CreateDTO dto) {
        TruckingCompany truckingCompany= new TruckingCompany();
        truckingCompany.setCompanyName(dto.getCompanyName());
        truckingCompany.setCompanyAddress(dto.getCompanyAddress());
        truckingCompany.setCompanyPhone(dto.getCompanyPhone());
        truckingCompany.setCompanyGmail(dto.getCompanyGmail());

        TruckingCompany save =truckingCompanyRepository.save(truckingCompany);

        ListDTO list= new ListDTO();
        list.setCompanyCode(save.getCompanyCode());
        list.setCompanyName(save.getCompanyName());
        list.setCompanyAddress(save.getCompanyAddress());
        list.setCompanyPhone(save.getCompanyPhone());
        list.setCompanyGmail(save.getCompanyGmail());
        return list;
    }

    @Override
    public ListDTO detailTrucking(String companyCode) {
        TruckingCompany truckingCompany = truckingCompanyRepository.findByCompanyCode(companyCode);
        ListDTO dto= new ListDTO();
        dto.setCompanyCode(truckingCompany.getCompanyCode());
        dto.setCompanyName(truckingCompany.getCompanyName());
        dto.setCompanyAddress(truckingCompany.getCompanyAddress());
        dto.setCompanyPhone(truckingCompany.getCompanyPhone());
        dto.setCompanyGmail(truckingCompany.getCompanyGmail());
        return  dto;
    }

    @Override
    public ListDTO updateTrucking(String companyCode, ListDTO dto) {

        TruckingCompany truckingCompany= truckingCompanyRepository.findByCompanyCode(companyCode);
        truckingCompany.setCompanyName(dto.getCompanyName());
        truckingCompany.setCompanyAddress(dto.getCompanyAddress());
        truckingCompany.setCompanyGmail(dto.getCompanyGmail());
        truckingCompany.setCompanyPhone(dto.getCompanyPhone());

        TruckingCompany update= truckingCompanyRepository.save(truckingCompany);
        ListDTO listDTO= new ListDTO();
        listDTO.setCompanyCode(update.getCompanyCode());
        listDTO.setCompanyName(update.getCompanyName());
        listDTO.setCompanyAddress(update.getCompanyAddress());
        listDTO.setCompanyPhone(update.getCompanyPhone());
        listDTO.setCompanyGmail(update.getCompanyGmail());
        return listDTO;

    }

    @Override
    public List<ListDTO> findByName(String companyName) {
        TruckingCompany truckingCompany= truckingCompanyRepository.findByCompanyName(companyName);
        if(truckingCompany == null){
            return new ArrayList<>();
        }
        return List.of(mapToListDTO(truckingCompany));
    }

    @Override
    public List<ResponeSearchDTO> selectAll() {
        return truckingCompanyRepository.findAll()
                .stream()
                .map(this::maptoResp)
                .toList();
    }

    private ResponeSearchDTO maptoResp(TruckingCompany truckingCompany) {
        ResponeSearchDTO dto=new ResponeSearchDTO();
        dto.setCompanyCode(truckingCompany.getCompanyCode());
        dto.setCompanyName(truckingCompany.getCompanyName());
        return dto;
    }

}
