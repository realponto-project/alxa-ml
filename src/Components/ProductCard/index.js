import React, { useState } from 'react'
import { Card, Carousel, Col, Row, Skeleton } from 'antd'
import { length, map } from 'ramda'

import emptySvg from '../../Assets/empty.svg'

import styles from './style.module.css'

const ProductCard = ({ id, price, name, description, images, onClick }) => {
  const [loaded, setLoaded] = useState(false)

  const imageStyle = loaded
    ? {
        maxWidth: 156,
        maxHeight: 156,
        width: 'auto',
        height: 'auto'
      }
    : { display: 'none' }

  return (
    <Col span={6} xs={24} sm={12} md={8} lg={8} xl={6} key={id}>
      <Card
        onClick={onClick}
        hoverable
        className={styles.wrapperCard}
        bodyStyle={{
          width: '100%',
          overflow: 'hidden'
        }}>
        <Row className={styles.rowCarousel} justify="center">
          <Carousel
            style={{
              width: 100,
              backgroundColor: 'red',
              margin: 5
            }}>
            {length(images) === 0 ? (
              <div className={styles.wrapperImage}>
                {loaded ? null : <Skeleton.Image />}
                <img
                  src={emptySvg}
                  alt={'empty'}
                  style={imageStyle}
                  onLoad={() => setLoaded(true)}
                />
              </div>
            ) : (
              <Carousel autoplay dots={false}>
                {map(({ url, alt }) => {
                  return (
                    <div key={alt} className={styles.wrapperImage}>
                      <img
                        style={imageStyle}
                        src={url}
                        alt={alt}
                        onLoad={() => setLoaded(true)}
                      />
                    </div>
                  )
                }, images)}
              </Carousel>
            )}
          </Carousel>
        </Row>
        <strong className={styles.productPrice}>{price}</strong>
        <br />
        <label className={styles.producName}>{name}</label>
        <p className={styles.productDescription}>{description}</p>
      </Card>
    </Col>
  )
}

export default ProductCard
