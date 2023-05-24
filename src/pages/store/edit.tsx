import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Switch, Tabs } from 'antd';

import { routerLinks } from '@utils';
import { Form } from '@core/form';
import { DistrictFacade, StoreFacade, WardFacade, ProvinceFacade, StoreManagement, SubStoreFacade, ConnectSupplierFacade, ProductFacade, InventoryProductFacade, CategoryFacade, SupplierStoreFacade, invoicekiotvietFacade } from '@store';
import { DataTable } from '@core/data-table';
import { Button } from '@core/button';
import { Download, Plus } from '@svgs';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const storeFacade = StoreFacade()
  const { data, isLoading, queryParams, status } = storeFacade;
  const productFacede = ProductFacade()
  const subStoreFacade = SubStoreFacade()
  const connectSupplierFacade = ConnectSupplierFacade()
  const inventoryProductFacade = InventoryProductFacade()
  const invoicevietFacade = invoicekiotvietFacade()

  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

  useEffect(() => {
    if(status === 'put.fulfilled')
    navigate(routerLinks('Store'))
  }, [status]);

  useEffect(() => {
    if (id) storeFacade.getById({ id });

    return () => {
      isReload.current && storeFacade.get(param);
    };
  }, [id]);

  const handleBack = () => navigate(routerLinks('Store') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: StoreManagement) => {
    storeFacade.put({ ...values, id });
  };

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className='tab-wrapper'>
          <Tabs defaultActiveKey='1' type='card' size='large'>
          <Tabs.TabPane tab={'Thông tin cửa hàng'} key='0' className='bg-white rounded-xl rounded-tl-none'>
              <Form
                values={{ ...data, street: data?.address?.street,emailContact: data?.userRole?.[0].userAdmin.email, phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber, nameContact: data?.userRole?.[0].userAdmin.name, provinceId: data?.address?.province?.id, districtId: data?.address?.district?.id, wardId: data?.address?.ward?.id, }}
                className="intro-x rounded-lg w-full"
                columns={[
                  {
                    title: 'store.Code',
                    name: 'code',
                    formItem: {
                      tabIndex: 1,
                      col: 4,
                      disabled: () => true
                    },
                  },
                  {
                    title: 'store.Name',
                    name: 'name',
                    formItem: {
                      tabIndex: 2,
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'store.Fax',
                    name: 'fax',
                    formItem: {
                      tabIndex: 3,
                      col: 4,
                    },
                  },
                  {
                    title: '',
                    name: 'address',
                    formItem: {
                      rules: [{ type: 'required' }],
                      render() {
                        return (
                          <h3 className='mb-2.5 text-base text-black font-medium'>Địa chỉ cửa hàng</h3>
                        )
                      },
                    }
                  },
                  {
                    title: 'store.Province',
                    name: 'provinceId',
                    formItem: {
                      tabIndex: 3,
                      col: 3,
                      rules: [{ type: 'requiredSelect' }],
                      type: 'select',

                      get: {
                        facade: ProvinceFacade,
                        format: (item: any) => ({
                          label: item.name,
                          value: item.id + '|' + item.code,
                        }),
                      },
                      onChange(value, form) {
                        form.resetFields(['districtId', 'wardId'])
                      },
                    },
                  },
                  {
                    title: 'store.District',
                    name: 'districtId',
                    formItem: {
                      type: 'select',
                      rules: [{ type: 'requiredSelect' }],
                      col: 3,
                      get: {
                        facade: DistrictFacade,
                        format: (item: any) => ({
                          label: item.name,
                          value: item.id + '|' + item.code,
                        }),
                        params: (fullTextSearch, value) => ({
                          fullTextSearch,
                          code: value().provinceId.slice(value().provinceId.indexOf('|') + 1),
                        }),
                      },
                      onChange(value, form) {
                        form.resetFields(['wardId'])
                      },
                    },
                  },
                  {
                    title: 'store.Ward',
                    name: 'wardId',
                    formItem: {
                      type: 'select',
                      rules: [{ type: 'requiredSelect' }],
                      col: 3,
                      get: {
                        facade: WardFacade,
                        format: (item: any) => ({
                          label: item.name,
                          value: item.id,
                        }),
                        params: (fullTextSearch, value) => ({
                          fullTextSearch,
                          code: value().districtId.slice(value().districtId.indexOf('|') + 1),
                        })
                      }
                    },
                  },
                  {
                    title: 'store.Street',
                    name: 'street',
                    formItem: {
                      rules: [{ type: 'required' }],
                      col: 3,
                    },
                  },
                  {
                    title: '',
                    name: '',
                    formItem: {
                      render() {
                        return (
                          <div className='text-xl text-teal-900 font-bold mb-2.5'>Thông tin người đại diện</div>
                        )
                      }
                    }
                  },
                  {
                    title: 'store.ContactName',
                    name: 'nameContact',
                    formItem: {
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'store.Contact Phone Number',
                    name: 'phoneNumber',
                    formItem: {
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'store.Contact Email',
                    name: 'emailContact',
                    formItem: {
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'store.Note',
                    name: 'note',
                    formItem: {
                      type: 'textarea',
                    },
                  },
                  {
                    title: '',
                    name: '',
                    formItem: {
                      render() {
                        return (
                          <div className='flex items-center mb-2.5'>
                            <div className='text-xl text-teal-900 font-bold mr-6'>Kết nối KiotViet</div>
                            <Switch className='bg-gray-500' />
                          </div>
                        )
                      }
                    }
                  },
                ]}
                handSubmit={handleSubmit}
                disableSubmit={isLoading}
                handCancel={handleBack}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Danh sách hàng hóa' key='2' className='rounded-xl'>
              <DataTable
                facade={productFacede}
                defaultRequest={{ page: 1, perPage: 10, storeId: data?.id, type: 'BALANCE' }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(routerLinks('store-managerment/edit') + '/' + data.id);
                  },
                })}
                columns={[
                  {
                    title: 'product.Code',
                    name: 'code',
                    tableItem: {
                      width: 150,
                      sorter: true,
                      filter: { type: 'search' }
                    },
                  },
                  {
                    title: 'product.StoreCode',
                    name: 'storeBarcode',
                    tableItem: {
                      sorter: true,
                      filter: { type: 'search' }
                    },
                  },
                  {
                    title: 'product.SupplierCode',
                    name: 'barcode',
                    tableItem: {
                      sorter: true,
                      filter: { type: 'search' }
                    },
                  },
                  {
                    title: 'product.Name',
                    name: 'name',
                    tableItem: {
                      sorter: true,
                      filter: { type: 'search' }
                    },
                  },
                  {
                    title: 'product.Category',
                    name: 'category',
                    tableItem: {
                      render: (value: any, item: any) => item.category?.child?.name
                    },
                  },
                  {
                    title: 'product.SupplierName',
                    name: 'supplierName',
                    tableItem: {
                    },
                  },
                  {
                    title: 'product.Unit',
                    name: 'basicUnit',
                    tableItem: {

                    },
                  },
                  {
                    title: 'product.Price',
                    name: 'productPrice',
                    tableItem: {
                      render: (text, item) => parseInt(item.productPrice[0] ? item.productPrice[0]?.price : '0').toLocaleString()
                    },
                  },
                ]}
                showSearch={false}
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationProduct', { from, to, total })
                }
                rightHeader={
                  <div className={'flex h-10 w-36'}>
                      <Button
                        className='!bg-white !font-normal whitespace-nowrap text-left flex justify-between w-full !px-3 !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group !mt-0'
                        icon={<Download className="icon-cud !p-0 !h-5 !w-5 !fill-gray-600 group-hover:!fill-white" />}
                        text={t('Xuất file excel')}
                        onClick={() => navigate(routerLinks(''))}
                      />
                  </div>
                }
                leftHeader={
                  <>
                   <Form
                    className="intro-x rounded-lg w-full form-store"
                    columns={
                      [
                        {
                          title: '',
                          name: 'supplierName',
                          formItem: {
                            placeholder: 'Chọn nhà cung cấp',
                            col: 5,
                            type: 'select',
                            get: {
                              facade: SupplierStoreFacade,
                              format: (item: any) => ({
                                label: item.name,
                                value: item.id,
                              }),
                              params: (fullTextSearch) => ({
                                fullTextSearch,
                                storeId: id,
                                type : 'BALANCE',
                              }),
                            },
                            onChange(value, form) {
                            },
                          },
                        },
                      ]
                    }
                  />
                  <Form
                    className="intro-x rounded-lg w-full form-store "
                    columns={
                      [
                        {
                          title: '',
                          name: 'cap1',
                          formItem: {
                            tabIndex: 3,
                            placeholder: 'Danh mục chính',
                            col: 3,
                            type: 'select',
                            get: {
                              facade: CategoryFacade,
                              format: (item: any) => ({
                                label: item.name,
                                value: item.id,
                              }),
                            },
                            onChange(value, form) {
                              form.resetFields(['cap2', 'cap3'])
                            },
                          },
                        },
                        {
                          name: 'cap2',
                          title: '',
                          formItem: {
                            // disabled:() => true,
                            placeholder: 'Danh mục cấp 1',
                            type: 'select',
                            col: 3,
                            get: {
                              facade: CategoryFacade,
                              format: (item: any) => ({
                                label: item.name,
                                value: item.id,
                              }),
                              params: (fullTextSearch, value) => ({
                                fullTextSearch,
                                id: value().cap1,
                              }),
                            },
                            onChange(value, form) {
                              form.resetFields(['cap3'])
                            },
                          },
                        },
                        {
                          name: 'cap3',
                          title: '',
                          formItem: {
                            // disabled:() => true,
                            placeholder: 'Danh mục cấp 2',
                            type: 'select',
                            col: 3,
                            get: {
                              facade: CategoryFacade,
                              format: (item: any) => ({
                                label: item.name,
                                value: item.id,
                              }),
                              params: (fullTextSearch, value) => ({
                                fullTextSearch,
                                id: value().cap2,
                              })
                            }
                          },
                        },
                      ]
                    }
                    // handSubmit={handleSubmit}
                    disableSubmit={isLoading}
                  />
                  </>
                }
              />
               <div className="sm:flex sm:mt-5 mt-2 ">
                <div className="flex flex-col items-center">
                  <button className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 text-sm h-11" onClick={() => navigate(routerLinks('Store'))}>
                    {t('components.form.modal.cancel')}
                  </button>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Danh sách chi nhánh' key='3' className='rounded-xl'>
              <DataTable
                facade={subStoreFacade}
                defaultRequest={{ page: 1, perPage: 10, storeId: data?.id, supplierType: 'BALANCE' }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(routerLinks('store/branch/edit') + '/' + data.id);
                  },
                })}
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationSubStore', { from, to, total })
                }
                columns={[
                  {
                    title: 'store.Code',
                    name: 'code',
                    tableItem: {
                      width: 120,
                    },
                  },
                  {
                    title: 'store.Name',
                    name: 'name',
                    tableItem: {
                    },
                  },
                  {
                    title: 'store.Address',
                    name: 'address',
                    tableItem: {
                      render: (value: any, item: any) => item.address?.street + ', ' + item.address?.wardName + ', ' + item.address?.districtName + ', ' + item.address?.provinceName,
                    },
                  },
                  {
                    title: 'store.ContactName',
                    name: 'peopleContact',
                    tableItem: {
                      render: (value: any, item: any) => item.peopleContact?.name,
                    },
                  },
                  {
                    title: 'store.Phone Number',
                    name: 'userpeopleContactRole',
                    tableItem: {
                      render: (value: any, item: any) => item.peopleContact?.phoneNumber,
                    },
                  },
                  {
                    title: 'Trạng thái',
                    name: 'isActive',
                    tableItem: {
                      render: (text: string) => text ? (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đang hoạt động</div>)
                        : (<div className='bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded'></div>),
                    },
                  },
                ]}
                rightHeader={
                  <div className={'flex gap-2 !bg-teal-900 !rounded-xl mt-0 max-lg:mt-2.5 max-lg:w-48'}>
                    <Button
                      className='!bg-teal-900 !rounded-3xl !font-normal !py-1.5'
                      icon={<Plus className="icon-cud !h-5 !w-5 !fill-white " />}
                      text={t('Thêm chi nhánh')}
                      onClick={() => navigate(routerLinks(''))}
                    />
                  </div>
                }
              />
               <div className="sm:flex sm:mt-5 mt-2 ">
                <div className="flex flex-col items-center">
                  <button className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 text-sm h-11" onClick={() => navigate(routerLinks('Store'))}>
                    {t('components.form.modal.cancel')}
                  </button>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Quản lý NCC' key='4' className='rounded-xl'>
              <DataTable
                facade={connectSupplierFacade}
                defaultRequest={{ page: 1, perPage: 10, idSuppiler: id }}
                xScroll='1270px'
                className=' bg-white p-5 rounded-lg'
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(routerLinks('store-managerment/edit') + '/' + data.id);
                  },
                })}
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationSupplier', { from, to, total })
                }
                columns={[
                  {
                    title: 'supplier.CodeName',
                    name: 'supplier',
                    tableItem: {
                      width: 150,
                      render: (value: any, item: any) => item.supplier?.code,
                    },
                  },
                  {
                    title: 'supplier.Name',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier?.name,
                    },
                  },
                  {
                    title: 'store.Address',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier.address?.street + ', ' + item.supplier.address?.ward.name + ', ' + item.supplier.address?.district.name + ', ' + item.supplier.address?.province.name,
                    },
                  },
                  {
                    title: 'store.Name management',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.name,
                    },
                  },
                  {
                    title: 'store.Phone Number',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.phoneNumber,
                    },
                  },
                ]}
              />
               <div className="sm:flex sm:mt-5 mt-2 ">
                <div className="flex flex-col items-center">
                  <button className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 text-sm h-11" onClick={() => navigate(routerLinks('Store'))}>
                    {t('components.form.modal.cancel')}
                  </button>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Doanh thu' key='5' className='rounded-xl'>
              <DataTable
                facade={invoicevietFacade.data}
                defaultRequest={{ page: 1, perPage: 10, idSuppiler: id }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(routerLinks('store-managerment/edit') + '/' + data.id);
                  },
                })}
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationSupplier', { from, to, total })
                }
                leftHeader={
                  <Form
                  className="intro-x rounded-lg w-full "
                  columns={
                    [
                      {
                        title: '',
                        name: 'supplierName',
                        formItem: {
                        //  tabIndex: 1,
                          placeholder: 'Chọn loại đơn hàng',
                          col: 7,
                          type: 'select',
                          get: {
                            facade:  ConnectSupplierFacade,
                            format: (item: any) => ({
                              label: item.supplier?.name,
                              value: item.supplier?.id,
                            }),
                            // params: (fullTextSearch: string, getFieldValue: any) => ({
                            //   fullTextSearch,
                            //   extend: { name: getFieldValue('supplierName') || undefined },
                            // }),
                          }
                        },
                      },
                    ]
                  }
                  // handSubmit={handleSubmit}
                  disableSubmit={isLoading}
                />
                }
                columns={[
                  {
                    title: 'supplier.CodeName',
                    name: 'supplier',
                    tableItem: {
                      width: 150,
                      render: (value: any, item: any) => item.supplier?.code,
                    },
                  },
                  {
                    title: 'supplier.Name',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier?.name,
                    },
                  },
                  {
                    title: 'store.Address',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier.address?.street + ', ' + item.supplier.address?.ward.name + ', ' + item.supplier.address?.district.name + ', ' + item.supplier.address?.province.name,
                    },
                  },
                  {
                    title: 'store.Name management',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.name,
                    },
                  },
                  {
                    title: 'store.Phone Number',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.phoneNumber,
                    },
                  },
                ]}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Quản lý kho' key='1' className='rounded-xl'>
            <DataTable
                facade={inventoryProductFacade}
                defaultRequest={{ page: 1, perPage: 10, idStore: id }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg form-store'
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationSubStore', { from, to, total })
                }
                columns={[
                  {
                    title: 'store.Inventory management.Product code',
                    name: 'inventory',
                    tableItem: {
                      width: 120,
                      render: (text: string, item: any) => item?.inventory?.[0]?.numberInKiot && console.log(item),
                    },
                  },
                  // {
                  //   title: 'store.Inventory management.Barcode (Supplier)',
                  //   name: 'supplierBarcode',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.inventory?.supplierBarcode,
                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Barcode (Product)',
                  //   name: 'storeBarcode',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.inventory?.storeBarcode,
                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Product name',
                  //   name: 'productName',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.inventory?.productName,
                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Category',
                  //   name: 'category',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.inventory?.category,
                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Supplier',
                  //   name: 'supplierName',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.inventory?.category,
                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Unit',
                  //   name: 'name',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.inventory?.category,
                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Quantity on KiotViet',
                  //   name: 'numberInKiot',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.inventory?.category,
                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Quantity on BALANCE',
                  //   name: 'numberInBal',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.inventory?.category,
                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Warehouse price',
                  //   name: 'inventoryPrice',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.inventory?.category,
                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Total amount',
                  //   name: 'inventoryPrice',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.inventory?.category,
                  //   },
                  // },
                ]}
                showSearch={false}
                rightHeader={
                  <div className={'h-10 w-24 '}>
                    {
                      <Button
                        className='!bg-teal-800 !font-normal w-full !text-white hover:!bg-teal-700 group'
                        text={t('Đồng bộ')}
                        onClick={() => navigate(routerLinks('Supplier/Excel'))}
                      />
                    }
                  </div>
                }
                leftHeader={
                  <Form
                    className="intro-x rounded-lg w-full "
                    columns={
                      [
                        {
                          title: '',
                          name: 'supplierName',
                          formItem: {
                           tabIndex: 1,
                            placeholder: 'Chọn nhà cung cấp',
                            col: 7,
                            type: 'select',
                            get: {
                              facade:  SupplierStoreFacade,
                              format: (item: any) => ({
                                label: item.name,
                                value: item.id,
                              }),
                              params: (fullTextSearch: string) => ({
                                type: 'BALANCE',
                                storeId: id
                              }),
                            }
                          },
                        },
                      ]
                    }
                  />
                }
              />
               <div className="sm:flex sm:mt-5 mt-2 ">
                <div className="flex flex-col items-center">
                  <button className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 text-sm h-11" onClick={() => navigate(routerLinks('Store'))}>
                    {t('components.form.modal.cancel')}
                  </button>
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
