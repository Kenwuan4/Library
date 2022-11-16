package com.javeriana.staff.controller;

import com.javeriana.staff.model.Staff;
import com.javeriana.staff.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staffAPI")
@CrossOrigin("http://localhost:4200/")
public class StaffController {
    @Autowired
    StaffService staffService;

    @PostMapping("/newStaff")
    private Staff saveStaff(@RequestBody Staff staff){
        return staffService.saveStaff(staff);
    }

    @PutMapping("/staff/{id}")
    private Staff invalidateStaff(@PathVariable("id") Integer id ){
        return staffService.invalidateStaff(id);
    }

    @GetMapping("/staff")
    private List<Staff> getStaff(){
        return staffService.listStaff();
    }

    @GetMapping("/staff/{id}")
    private Staff getStaffByid(@PathVariable("id") Integer id){ return staffService.getStaffById(id); }

    @PutMapping("/staff")
    private Staff updateStaff(@RequestBody Staff staff)
    {
        return staffService.saveStaff(staff);
    }


}