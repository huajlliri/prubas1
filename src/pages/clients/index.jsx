import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import ClientForm from "../../components/clients/Form";
import useClientesApi from "../../server/clientes.api";
import { requestDefaultApi } from "../../server/requestApi";

function ClientsView() {
  const { handleSubmit, handleEdit, handleDelete, data, setData } =
    useClientesApi({ generalApi: "clientes" });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedClient, setEditedClient] = useState({});

  useEffect(() => {
    requestDefaultApi("clientes", setData);
  }, []);

  const openEditModal = (client) => {
    setEditedClient(client);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedClient({});
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div>
        <h1>Clientes</h1>
        <Formik
          initialValues={{
            nombre: "",
            telefono: "",
            descripcion: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            handleSubmit("POST", "clientes", values);
            resetForm();
          }}
          onReset={() => console.log("reset")}
        >
          {() => (
            <Form className="space-y-2 md:space-y-4">
              <Field
                type="text"
                name="codigo"
                placeholder="Codigo de usuario"
                required={true}
              />
              <Field
                type="text"
                name="nombre"
                placeholder="Nombre de usuario"
                required={true}
              />
              <Field
                type="text"
                name="telefono"
                placeholder="Telefono de usuario"
                required={true}
              />
              <Field
                type="text"
                name="descripcion"
                placeholder="Descripcion de usuario"
                required={true}
              />
              <button type="submit">Guardar</button>
            </Form>
          )}
        </Formik>

        <ul>
          {data.map((client) => (
            <li key={client.id}>
              <div>
                ID: <span className="font-bold">{client.id}</span>
              </div>
              <div>
                Codigo: <span className="font-bold">{client.codigo}</span>
              </div>
              <div>
                Nombre: <span className="font-bold">{client.nombre}</span>
              </div>
              <div>
                Telefono: <span className="font-bold">{client.telefono}</span>
              </div>
              <div>
                Descripcion: <span className="font-bold">{client.descripcion}</span>
              </div>
              <button onClick={() => openEditModal(client)}>Editar</button>
              <button onClick={() => handleDelete("DELETE", `clientes/${client.id}`)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de edición */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container">
            <div className="modal-content">
              <h2>Editar Cliente</h2>
              <Formik
                initialValues={{
                  nombre: editedClient.nombre || "",
                  telefono: editedClient.telefono || "",
                  descripcion: editedClient.descripcion || "",
                }}
                onSubmit={async (values) => {
                  handleSubmit("PUT", `clientes/${editedClient.id}`, values);
                  closeEditModal();
                }}
              >
                {() => (
                  <Form className="space-y-2 md:space-y-4">
                    <Field
                      type="text"
                      name="nombre"
                      placeholder="Nombre de usuario"
                      required={true}
                    />
                    <Field
                      type="text"
                      name="telefono"
                      placeholder="Telefono de usuario"
                      required={true}
                    />
                    <Field
                      type="text"
                      name="descripcion"
                      placeholder="Descripcion de usuario"
                      required={true}
                    />
                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onClick={closeEditModal}>
                      Cancelar
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ClientsView;
