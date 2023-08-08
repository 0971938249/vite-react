import { CheckboxOptionType } from 'antd';
import { language, languages } from './variable';
import { gsap } from 'gsap';
import LazyLoad from 'vanilla-lazyload';
import React, { Fragment } from 'react';

export * from './init/reportWebVitals';
export * from './api';
export * from './variable';
export * from '../router-links';
export * from './convertFormValue';

export const cleanObjectKeyNull = (obj: { [selector: string]: any }) => {
  for (const propName in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, propName)) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        (typeof obj[propName] === 'object' && Object.keys(obj[propName]).length === 0)
      ) {
        delete obj[propName];
      } else if (typeof obj[propName] === 'object') {
        const keys = Object.keys(obj[propName]);
        let check = true;
        keys.forEach((key: string) => {
          if (check && obj[propName][key] !== undefined) {
            check = false;
          }
        });
        if (check) {
          delete obj[propName];
        }
      }
    }
  }
  return obj;
};

export const getSizePageByHeight = (height = 39, minusNumber = 3) =>
  Math.floor(
    (document.body.getBoundingClientRect().height -
      document.getElementsByTagName('tbody')[0].getBoundingClientRect().top) /
      height,
  ) - minusNumber;
export const getFilter = (queryParams = '{}', key = 'id') =>
  JSON.parse(JSON.parse(queryParams || '{}').filter || '{}')[key] || null;

export const loopMapSelect = (array?: any[], label = 'name', value = 'id'): CheckboxOptionType[] =>
  array?.length
    ? array.map((item) => ({
        label: item[label],
        value: item[value],
        isLeaf: !item.children.length,
        children: item.children ? loopMapSelect(item.children, label, value) : undefined,
      }))
    : [];

export const lang =
  languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

export const animationSlide = (e: Element, delay: number) => {
  const tl = gsap.timeline({ delay, defaults: { duration: 1, ease: 'power1.inOut' } });
  const eGsap = e.querySelectorAll('.gsap');
  const old = gsap.getTweensOf(eGsap);
  if (old.length > 0) {
    old.forEach((item) => item.kill());
    return true;
  }
  eGsap.forEach((item) => {
    if (item.classList.contains('left')) tl.from(item, { x: '-=10%', scale: '+=0.15', opacity: '-=1' }, '<0.25');
    if (item.classList.contains('right')) tl.from(item, { x: '+=10%', scale: '+=0.15', opacity: '-=1' }, '<0.5');
    if (item.classList.contains('top')) tl.from(item, { y: '-=50%', scale: '+=0.15', opacity: '-=1' }, '<0.25');
    if (item.classList.contains('bottom')) tl.from(item, { y: '+=50%', scale: '+=0.15', opacity: '-=1' }, '<0.5');
    if (item.classList.contains('zoom')) gsap.to(item, { scale: '+=0.1', duration: 20 });
  });
};
export const lazyLoad = () =>
  new LazyLoad({
    callback_error: (el: any) => (el.src = 'https://via.placeholder.com/440x560/?text=Error'),
  });

export const renderEditorjs = (blocks: Record<string, object>[]) => {
  const Heading = ({ level, children, ...props }: any) => React.createElement('h'.concat(level), props, children);

  return (
    <div className="html-render">
      {blocks!.map((subItem: any, subIndex: number) => (
        <Fragment key={subIndex}>
          {subItem?.type === 'header' && (
            <Heading level={subItem?.data.level} dangerouslySetInnerHTML={{ __html: subItem?.data?.text }} />
          )}
          {subItem?.type === 'paragraph' && <p dangerouslySetInnerHTML={{ __html: subItem?.data?.text }} />}
          {subItem?.type === 'image' && (
            <div className="text-center py-5">
              <img alt={subItem.data.caption} src={subItem.data.file.url} />
              {subItem.data.caption && (
                <span className={'caption'} dangerouslySetInnerHTML={{ __html: subItem.data.caption }} />
              )}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
