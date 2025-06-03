import React, { useContext } from 'react';
import { GenderContext } from '../GenderPanel';


const Categorias = ({ title, categorias }) => {
    const { selectedGender } = useContext(GenderContext);

    const filteredCategorias = categorias?.filter(categoria =>
        categoria.genero === selectedGender
    );

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '16px',
        }}>
            {filteredCategorias?.map((categoria, idx) => (
                <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '12px',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    background: '#fff',
                }}>
                    <img
                        src={categoria.imagen}
                        alt={categoria.nombre}
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '8px', borderRadius: '6px' }}
                    />
                    <span style={{ fontWeight: 'bold', textAlign: 'center' }}>{categoria.nombre}</span>
                </div>
            ))}
        </div>
    );
};

Categorias.schema = {
    title: 'Categorias',
    description: 'Componente para mostrar categorías filtradas por género',
    type: 'object',
    properties: {
        categorias: {
            type: 'array',
            title: 'Categorías',
            items: {
                type: 'object',
                properties: {
                    nombre: {
                        type: 'string',
                        title: 'Nombre de la categoría',
                    },
                    imagen: {
                        type: 'string',
                        title: 'Imagen de la categoría',
                        "widget": {
                            "ui:widget": "image-uploader",
                        }
                    },
                    genero: {
                        type: 'string',
                        title: 'Género de la categoría',
                    }
                },
                required: ['nombre', 'imagen', 'genero'],
            },
        }
    },
}

export default Categorias;