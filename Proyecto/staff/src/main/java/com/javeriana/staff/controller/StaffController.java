package com.javeriana.staff.controller;
import com.javeriana.staff.model.Staff;
import com.javeriana.staff.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * Es el controlador que expone metodos HTTP para administrar usuarios.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@RestController
@RequestMapping("/staffAPI")
@CrossOrigin("http://localhost:4200/")
public class StaffController {
    @Autowired
    StaffService staffService;
    /**
     * En este método HTTP POST se usa para guardar un empleado.
     *@param  staff Este parametro corresponde al usuario a guardar.
     * @return User retorna el usuario guardado.
     */
    @PostMapping("/newStaff")
    private Staff saveStaff(@RequestBody Staff staff){
        return staffService.saveStaff(staff);
    }
    /**
     * En este método HTTP PUT se usa para deshabilitar un empleado.
     *@param  id Este parametro corresponde al usuario a invalidar
     * @return User retorna el usuario inhabilitado.
     */
    @PutMapping("/staff/{id}")
    private Staff invalidateStaff(@PathVariable("id") Integer id ){
        return staffService.invalidateStaff(id);
    }
    /**
     * En este método HTTP GET se usa para buscar los empleados
     * @return User retorna los empleados encontrados.
     */
    @GetMapping("/staff")
    private List<Staff> getStaff(){
        return staffService.listStaff();
    }
    /**
     * En este método HTTP GET se usa para un empleado por id
     *@param  id Este parametro corresponde al usuario a buscar.
     * @return User retorna el usuario encontrado.
     */
    @GetMapping("/staff/{id}")
    private Staff getStaffByid(@PathVariable("id") Integer id){ return staffService.getStaffById(id); }
    /**
     * En este método HTTP PUT se usa para actualizar un empleado.
     *@param  staff Este parametro corresponde al usuario a actualizar
     * @return User retorna el usuario actualizado.
     */
    @PutMapping("/staff")
    private Staff updateStaff(@RequestBody Staff staff)
    {
        return staffService.saveStaff(staff);
    }


}