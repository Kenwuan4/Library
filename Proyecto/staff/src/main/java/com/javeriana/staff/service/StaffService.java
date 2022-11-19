package com.javeriana.staff.service;


import com.javeriana.staff.model.Staff;
import com.javeriana.staff.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
/**
 * Es el servicio es usado para administrar a los empleados.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@Service
public class StaffService {

    @Autowired
    StaffRepository staffRepository;
    /**
     * En este método es usado para sacar todos los empleados.
     * @return User retorna el usuario encontrado.
     */
    public List<Staff> listStaff(){
        return staffRepository.findAll();
    }
    /**
     * En este método se usa para buscar un empleado por id
     *@param  id Este parametro corresponde al id del usuario a buscar.
     * @return User retorna el usuario encontrado.
     */
    public Staff getStaffById(Integer id){return staffRepository.findStaffById(id); }
    /**
     * En este método se usa para guardar un empleado
     *@param  staff Este parametro corresponde al usuario a guardar
     * @return User retorna el usuario guardado.
     */
    public Staff saveStaff(Staff staff){
        return  staffRepository.save(staff);
    }
    /**
     * En este método se usa para invalidar un empleado  por id
     *@param  id Este parametro corresponde al id del usuario a invalidar.
     * @return User retorna el usuario invalidado
     */
    public Staff invalidateStaff (Integer id){
        Staff staff = staffRepository.findById(id).get();
        staff.setStatus(!staff.isStatus());
        return staffRepository.save(staff);
    }

}