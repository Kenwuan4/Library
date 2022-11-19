package com.example.editorial.repository;
import com.example.editorial.model.Editorial;
import org.springframework.data.jpa.repository.JpaRepository;
/**
 * Es la interfaz que se conecta con la base de datos para realizar acciones con las editoriales.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
public interface EditorialRepository extends JpaRepository<Editorial, Integer> {
    /**
     * En este método se busca una editorial por nombre
     * @param name corresponde al nombre de la editorial a buscar.
     * @return Editorial corresponde a la editorial encontrada.
     */
    Editorial findEditorialByName(String name);
    /**
     * En este método se busca una editorial por id
     * @param id corresponde al id de la editorial a buscar.
     * @return Editorial corresponde a la editorial encontrada.
     */
    Editorial findEditorialById(Integer id);

}
