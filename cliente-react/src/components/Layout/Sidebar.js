/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Lista from '../Projects/Lista';
import NuevoProyecto from '../Projects/NuevoProyecto';

const Sidebar = () => (
  <aside>
    <h1>
      MERN
      <span> Tasks</span>
    </h1>
    <NuevoProyecto />
    <div className="proyectos">
      <h2>Tus proyectos</h2>
      <Lista />
    </div>
  </aside>
);

export default Sidebar;
