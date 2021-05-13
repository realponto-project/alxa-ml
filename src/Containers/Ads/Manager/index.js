import React from 'react'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

import ModalAdd from '../Add'
import AdList from './AdList'

const { Title } = Typography

const Manager = ({
  clearFilters,
  closeModalAdd,
  expand,
  filters,
  formAdd,
  handleClickEdit,
  handleClickExpand,
  handleFilter,
  handleSubmitAdd,
  loading,
  modelTitle,
  onChangeSearch,
  openModalAdd,
  source,
  visibleModalAdd,
  onChangeTable,
  total,
  page
}) => (
  <Row gutter={[8, 16]}>
    <Col span={24}>
      <Card bordered={false}>
        <Row>
          <Col span={12}>
            <Title style={{ marginBottom: 0 }} level={4}>
              Atualize e transmita seus anúncios
            </Title>
            <p style={{ marginBottom: 0 }}>Importe sua planilha com os valores atualizados</p>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button
              onClick={openModalAdd}
              style={{ marginRight: '16px' }}
              icon={<PlusOutlined />}>
              Importar
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
    <Col span={24}>
      <Card bordered={false}>
        <Row gutter={[8, 8]}>
          <Col span={16}>
            <Input
              name="search_name_or_document"
              placeholder="Filtre por nome ou documento"
              prefix={<SearchOutlined />}
              value={filters.search_name_or_document}
              onChange={onChangeSearch}
            />
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button style={{ marginRight: '16px' }} onClick={clearFilters}>
              Limpar filtros
            </Button>
            <Button type="primary" onClick={handleFilter}>
              Filtrar
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
    <Col span={24}>
      <Card bordered={false}>
        <AdList 
          onChangeTable={onChangeTable} 
          datasource={source} 
          total={total}
          handleClickEdit={handleClickEdit} 
          loading={loading}
          page={page}/>
      </Card>
    </Col>

    <ModalAdd
      expand={expand}
      form={formAdd}
      handleCancel={closeModalAdd}
      handleClickExpand={handleClickExpand}
      handleSubmit={handleSubmitAdd}
      loading={loading}
      title={modelTitle}
      visible={visibleModalAdd}
    />
  </Row>
)

export default Manager
