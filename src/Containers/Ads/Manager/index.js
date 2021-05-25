import React from 'react'
import { Button, Card, Col, Input, Row, Typography, Upload, Checkbox } from 'antd'
import { SearchOutlined, UploadOutlined } from '@ant-design/icons'

import AdList from './AdList'

const CheckboxGroup = Checkbox.Group
const { Title } = Typography
const plainOptions = ['Ativo', 'Inativo']

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
              <Upload>
                <Button
                  onClick={openModalAdd}
                  style={{ marginRight: '16px' }}
                  icon={<UploadOutlined />}>
                  Importar planilha
              </Button>
              </Upload>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={14}>
              <Input
                name="search_name_or_document"
                placeholder="Filtre por sku ou descrição"
                prefix={<SearchOutlined />}
                value={filters.search_name_or_document}
                onChange={onChangeSearch}
              />
            </Col>
            <Col span={4} style={{ paddingTop: '5px' }}>
              <CheckboxGroup
                options={plainOptions}
                value={filters.activated}
                // onChange={(value) =>
                //   handleOnChange({ target: { name: 'activated', value } })
                // }
              />
            </Col>
            <Col span={6} style={{ textAlign: 'right' }}>
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
            page={page} />
        </Card>
      </Col>
    </Row>
  )

export default Manager
