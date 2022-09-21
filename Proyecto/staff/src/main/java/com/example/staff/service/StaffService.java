package com.example.staff.service;


import com.example.staff.model.Staff;
import com.example.staff.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class StaffService {

    @Autowired
    StaffRepository staffRepository;

    public List<Staff> listStaff(){
        return staffRepository.findAll();
    }

    public Staff saveStaff(Staff staff){
        return  staffRepository.save(staff);
    }

    public void invalidateStaff (Integer id){
        Staff staff = staffRepository.findById(id).get();
        staff.setActive(false);
        staffRepository.save(staff);
    }

}
