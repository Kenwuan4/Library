package com.javeriana.staff.repository;
import com.javeriana.staff.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
/**
 * Esta interfaz es usada para conectar la base de datos y realizar operaciones con los empleados.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
public interface StaffRepository extends JpaRepository<Staff, Integer> {
    /**
     * En este método HTTP POST se usa para buscar un empleado por id
     *@param  id Este parametro corresponde al id del usuario a buscar.
     * @return User retorna el usuario encontrado.
     */
    public Staff findStaffById(Integer id);
}
