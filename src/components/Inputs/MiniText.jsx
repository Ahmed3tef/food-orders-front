import React from 'react';
import './_UploadForm.scss';

const MiniText = props => {
  let direction;
  const width = props.width ? props.width : '80%';
  if (props.path === 'product') {
    // دا عشان ميحودش يمين غير ف البردوكت بس
    direction = props.direction;
  }

  return (
    <>
      {props.hint && <div className='input-hint'>{props.hint}</div>}
      <div
        className={`${props.classes} input-container input-text-mini`}
        style={{ direction: !props.turnText ? '' : direction }}>
        {props.label && (
          <div className='input-label' style={{
            width: props.labelWidth ? props.labelWidth : ''
          }}>
            <p>{props.label}</p>
          </div>
        )}

        <input
          style={{
            direction: props.direction ? props.direction : 'ltr',
            width: !props.label ? '100%' : width,
          }}
          type={props.type || 'text'}
          placeholder={props.placeholder}
          value={props.name}
          required={props.required ? props.required : false}
          onChange={event => {
            props.setName(event.target.value);
          }}
        />
      </div>
    </>
  );
};

export default MiniText;
