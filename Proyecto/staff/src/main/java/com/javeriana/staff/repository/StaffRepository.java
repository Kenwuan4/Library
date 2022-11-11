package com.javeriana.staff.repository;

import com.javeriana.staff.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Integer> {

    public Staff findStaffById(Integer id);
}
