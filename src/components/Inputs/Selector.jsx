import React, { useEffect, useState } from 'react';

import './selector.css';
import './_UploadForm.scss';
const Selector = props => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    props.setId('');
  }, []);

  let direction;
  const width = props.width ? props.width : '80%';
  if (props.path === 'product') {
    // دا عشان ميحودش يمين غير ف البردوكت بس
    direction = props.direction;
  }
  const changeIdHandler = e => {
    props.setId(e.target.value);
    setIsLoading(false);
  };
  return (
    <div
      className={`${props.classes} input-container custom-select`}
      style={{ direction: !props.turnText ? '' : direction }}>
      <div className='input-label '>
        <p>{props.label}</p>
      </div>
      <select
        style={{
          direction: props.direction ? props.direction : 'ltr',
          width: !props.label ? '100%' : width,
        }}
        onChange={changeIdHandler}
        value={isLoading ? '' : props.id}
        placeholder=''>
        <option
          value=''
          disabled
          defaultValue
          key={Math.round(Math.random() * 10000)}>
          Select from these options
        </option>
        {props.data && props.data.map((el, i) => {
          // console.log(el);
          return (
            <option value={el.id} key={el.id}>
              {`${el.name}`}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selector;
