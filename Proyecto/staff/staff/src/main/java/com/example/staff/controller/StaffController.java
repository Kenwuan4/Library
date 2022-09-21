package com.example.staff.controller;

import com.example.staff.model.Staff;
import com.example.staff.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class StaffController {
    @Autowired
    StaffService staffService;

    @PostMapping("/new_staff")
    private Staff saveStaff(@RequestBody Staff staff){
        return staffService.saveStaff(staff);
    }

    @PostMapping("/staff/{id}")
    private void invalidateStaff(@PathVariable("id") Integer id ){
        staffService.invalidateStaff(id);
    }

    @GetMapping("/all_staff")
    private List<Staff> getStaff(){
        return staffService.listStaff();
    }

    @PutMapping("/staff")
    private Staff updateStaff(@RequestBody Staff staff)
    {
        return staffService.saveStaff(staff);
    }


}