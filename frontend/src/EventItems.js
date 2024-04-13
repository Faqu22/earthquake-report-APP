import { Table, TableBody, TableCell, TableHeader, TableRow, TableColumn } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";
import CommentModal from './CommentModal';
import {Textarea} from "@nextui-org/react";
import MagnitudeFilter from './MagnitudeFilter';
import axios from 'axios';

function createData(
  id,
  title,
  magnitute,
  place,
  time,
  mag_type,
  tsunami,
  longitude,
  latitude,
  external_url
) {
  return { id, title, magnitute, place, time, mag_type, tsunami, longitude, latitude, external_url };
}

export default function BasicTable({ events, setUrlFilter, urlFilter }) {
  const [rows, setRows] = useState([]);
  const [comment, setComment] = useState("")
  const [ isInvalid, setIsInvalid ] = useState(false);
  
  const options = [
    { label: 'md', value: 'md' },
    { label: 'ml', value: 'ml' },
    { label: 'ms', value: 'ms' },
    { label: 'mw', value: 'mw' },
    { label: 'me', value: 'me' },
    { label: 'mi', value: 'mi' },
    { label: 'mb', value: 'mb' },
    { label: 'mlg', value: 'mlg' },
  ];

  const sendComment = async (feature_id) => {
    try {
      if (comment === "") {
        setIsInvalid(true);
        return false;
      }
      const response = await axios.post('http://localhost:3000/api/features/' + feature_id + '/comments', { body: comment });
      setComment("")
      setIsInvalid(false);
      return true;
    }
    catch (error) {
      setIsInvalid(true);
      return false;
    }
  }

  useEffect(() => {
    const newRows = events.map(event => {
      const datetime = new Date(event.attributes.time * 1000);
      const formatedHour = datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formatedTime = datetime.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' });
      const Fulltime = `${formatedHour}  \n ${formatedTime}`;
      return createData(
        event.id,
        event.attributes.title,
        event.attributes.magnitude,
        event.attributes.place,
        Fulltime,
        event.attributes.mag_type,
        event.attributes.tsunami,
        parseFloat(event.attributes.coordinates.longitude).toFixed(2),
        parseFloat(event.attributes.coordinates.latitude).toFixed(2),
        event.links.external_url
      );
    });
    setRows(newRows);
  }, [events]);
  
    
  
  return (
      <Table>
        <TableHeader>
            <TableColumn align="center"><strong>Titulo</strong></TableColumn>
            <TableColumn align="center"><strong>Magnitud</strong></TableColumn>
            <TableColumn align="center"><strong>Ubicacion</strong></TableColumn>
            <TableColumn align="center"><strong>Fecha y hora</strong></TableColumn>
            <TableColumn align="center" style={{width: "200px"}}><MagnitudeFilter options={options} setUrlFilter={setUrlFilter} urlFilter={urlFilter}/></TableColumn>
            <TableColumn align="center"><strong>Tsunami</strong></TableColumn>
            <TableColumn align="center"><strong>Longitud</strong></TableColumn>
            <TableColumn align="center"><strong>Latitud</strong></TableColumn>
            <TableColumn align="center"><strong>Acciones</strong></TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No hay datos que mostrar"}>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              class="p-14"
              style={index % 2 ? { background: "#ffffff33" } : { background: "#F7F6FE" }}
            >
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.magnitute}</TableCell>
              <TableCell align="center">{row.place}</TableCell>
              <TableCell align="center">{row.time}</TableCell>
              <TableCell align="center" class="w-40">{row.mag_type}</TableCell>
              <TableCell align="center">{row.tsunami ? 'Si' : 'No'}</TableCell>
              <TableCell align="center">{row.longitude}</TableCell>
              <TableCell align="center">{row.latitude}</TableCell>
              <TableCell align="center">
                <div class="flex">
                  <CommentModal
                    title={[<span key="first-line" class="text-[#5f5f5f]">Deja un comentario a la noticia de:</span>,
                      row.title
                    ]}
                    content={[
                      <Textarea
                        label="Comentario"
                        isInvalid={isInvalid}
                        placeholder='Agrega un comentario'
                        errorMessage={isInvalid ? "No puede enviar un comentario vacío. ¡En caso de querer, ingrese un comentario!" : ""}
                        onChange={(e) => setComment(e.target.value)}/>
                    ]}
                    setIsInvalid={(value) => setIsInvalid(value)}
                    sendFunction={() => sendComment(row.id)} />
                  <a href={row.external_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', marginLeft: '10px', marginBottom: '5px' }}>
                    <FaExternalLinkAlt size={18} />
                  </a>
                  </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}
