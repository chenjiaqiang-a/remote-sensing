import { Button, Col, Layout, Row, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import featureImg1 from '../assets/images/feature-01.png';
import featureImg2 from '../assets/images/feature-02.png';
import featureImg3 from '../assets/images/feature-03.png';

const { Title, Paragraph } = Typography;

const { Content, Footer } = Layout;

const Home = () => {
    const nav = useNavigate();
    return (
        <Layout className="rs-home">
            <Content>
                <section className="home-banner">
                    <Typography style={{ maxWidth: 800 }}>
                        <Title style={{ fontSize: 64 }}>Remote Sensing</Title>
                        <Paragraph style={{ fontSize: 24, color: '#13227a' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptas deserunt quod eligendi possimus
                            perspiciatis labore?
                        </Paragraph>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => nav('/platform')}
                        >
                            开始使用
                        </Button>
                    </Typography>
                </section>
                <section className="home-feature">
                    <div className="section-container">
                        <Typography
                            style={{
                                maxWidth: 800,
                                margin: '0 auto',
                                textAlign: 'center',
                            }}
                        >
                            <Title style={{ textTransform: 'uppercase' }}>
                                why choose us
                            </Title>
                            <Paragraph>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ea ducimus, odit repellendus
                                officia ab optio qui fugit voluptatum alias
                                quis?
                            </Paragraph>
                        </Typography>
                        <Row gutter={16}>
                            <Col span={8}>
                                <img src={featureImg1} alt="feature-1" />
                                <Typography style={{ textAlign: 'center' }}>
                                    <Title level={3}>why choose us</Title>
                                    <Paragraph>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Ea ducimus, odit
                                        repellendus officia ab optio qui fugit
                                        voluptatum alias quis?
                                    </Paragraph>
                                </Typography>
                            </Col>
                            <Col span={8}>
                                <img src={featureImg2} alt="feature-2" />
                                <Typography style={{ textAlign: 'center' }}>
                                    <Title level={3}>why choose us</Title>
                                    <Paragraph>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Ea ducimus, odit
                                        repellendus officia ab optio qui fugit
                                        voluptatum alias quis?
                                    </Paragraph>
                                </Typography>
                            </Col>
                            <Col span={8}>
                                <img src={featureImg3} alt="feature-3" />
                                <Typography style={{ textAlign: 'center' }}>
                                    <Title level={3}>why choose us</Title>
                                    <Paragraph>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Ea ducimus, odit
                                        repellendus officia ab optio qui fugit
                                        voluptatum alias quis?
                                    </Paragraph>
                                </Typography>
                            </Col>
                        </Row>
                    </div>
                </section>
                <section className="home-about">
                    <div className="section-container">
                        <Typography
                            style={{
                                maxWidth: 800,
                                margin: '0 auto',
                                textAlign: 'center',
                            }}
                        >
                            <Title style={{ textTransform: 'uppercase' }}>
                                what can we do
                            </Title>
                            <Paragraph>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aliquid provident dolore
                                repellendus assumenda sit in dicta amet hic
                                debitis ducimus?
                            </Paragraph>
                        </Typography>
                        <Row gutter={16} className="about-card">
                            <Col span={10}>
                                <img src={featureImg1} alt="about-1" />
                            </Col>
                            <Col span={14} className="about-desc">
                                <Typography>
                                    <Title
                                        level={3}
                                        style={{ textAlign: 'center' }}
                                    >
                                        目标提取
                                    </Title>
                                    <Paragraph style={{ fontSize: 16 }}>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Tempora minus hic,
                                        nesciunt mollitia alias veritatis
                                        voluptatibus, nemo quaerat totam
                                        accusantium unde voluptates enim,
                                        corporis voluptatem. Repudiandae
                                        expedita itaque hic, illum ipsum,
                                        asperiores obcaecati cupiditate fugiat
                                        dicta quia repellat nihil? Quibusdam.
                                    </Paragraph>
                                    <Paragraph style={{ fontSize: 16 }}>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Magnam magni aliquam
                                        quod perspiciatis quisquam quas quam
                                        necessitatibus, odio error culpa iusto
                                        iste. Itaque doloremque officia odio vel
                                        dolores! Nobis, beatae.
                                    </Paragraph>
                                    <Paragraph style={{ textAlign: 'center' }}>
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={() =>
                                                nav(
                                                    '/platform/target-extraction'
                                                )
                                            }
                                        >
                                            前往体验
                                            <ArrowRightOutlined />
                                        </Button>
                                    </Paragraph>
                                </Typography>
                            </Col>
                        </Row>
                        <Row gutter={16} className="about-card">
                            <Col span={14} className="about-desc">
                                <Typography>
                                    <Title
                                        level={3}
                                        style={{ textAlign: 'center' }}
                                    >
                                        变化检测
                                    </Title>
                                    <Paragraph style={{ fontSize: 16 }}>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Tempora minus hic,
                                        nesciunt mollitia alias veritatis
                                        voluptatibus, nemo quaerat totam
                                        accusantium unde voluptates enim,
                                        corporis voluptatem. Repudiandae
                                        expedita itaque hic, illum ipsum,
                                        asperiores obcaecati cupiditate fugiat
                                        dicta quia repellat nihil? Quibusdam.
                                    </Paragraph>
                                    <Paragraph style={{ fontSize: 16 }}>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Magnam magni aliquam
                                        quod perspiciatis quisquam quas quam
                                        necessitatibus, odio error culpa iusto
                                        iste. Itaque doloremque officia odio vel
                                        dolores! Nobis, beatae.
                                    </Paragraph>
                                    <Paragraph style={{ textAlign: 'center' }}>
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={() =>
                                                nav(
                                                    '/platform/change-detection'
                                                )
                                            }
                                        >
                                            前往体验
                                            <ArrowRightOutlined />
                                        </Button>
                                    </Paragraph>
                                </Typography>
                            </Col>
                            <Col span={10}>
                                <img src={featureImg1} alt="about-2" />
                            </Col>
                        </Row>
                        <Row gutter={16} className="about-card">
                            <Col span={10}>
                                <img src={featureImg1} alt="about-3" />
                            </Col>
                            <Col span={14} className="about-desc">
                                <Typography>
                                    <Title
                                        level={3}
                                        style={{ textAlign: 'center' }}
                                    >
                                        目标检测
                                    </Title>
                                    <Paragraph style={{ fontSize: 16 }}>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Tempora minus hic,
                                        nesciunt mollitia alias veritatis
                                        voluptatibus, nemo quaerat totam
                                        accusantium unde voluptates enim,
                                        corporis voluptatem. Repudiandae
                                        expedita itaque hic, illum ipsum,
                                        asperiores obcaecati cupiditate fugiat
                                        dicta quia repellat nihil? Quibusdam.
                                    </Paragraph>
                                    <Paragraph style={{ fontSize: 16 }}>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Magnam magni aliquam
                                        quod perspiciatis quisquam quas quam
                                        necessitatibus, odio error culpa iusto
                                        iste. Itaque doloremque officia odio vel
                                        dolores! Nobis, beatae.
                                    </Paragraph>
                                    <Paragraph style={{ textAlign: 'center' }}>
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={() =>
                                                nav(
                                                    '/platform/object-detection'
                                                )
                                            }
                                        >
                                            前往体验
                                            <ArrowRightOutlined />
                                        </Button>
                                    </Paragraph>
                                </Typography>
                            </Col>
                        </Row>
                        <Row gutter={16} className="about-card">
                            <Col span={14} className="about-desc">
                                <Typography>
                                    <Title
                                        level={3}
                                        style={{ textAlign: 'center' }}
                                    >
                                        地物分类
                                    </Title>
                                    <Paragraph style={{ fontSize: 16 }}>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Tempora minus hic,
                                        nesciunt mollitia alias veritatis
                                        voluptatibus, nemo quaerat totam
                                        accusantium unde voluptates enim,
                                        corporis voluptatem. Repudiandae
                                        expedita itaque hic, illum ipsum,
                                        asperiores obcaecati cupiditate fugiat
                                        dicta quia repellat nihil? Quibusdam.
                                    </Paragraph>
                                    <Paragraph style={{ fontSize: 16 }}>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Magnam magni aliquam
                                        quod perspiciatis quisquam quas quam
                                        necessitatibus, odio error culpa iusto
                                        iste. Itaque doloremque officia odio vel
                                        dolores! Nobis, beatae.
                                    </Paragraph>
                                    <Paragraph style={{ textAlign: 'center' }}>
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={() =>
                                                nav(
                                                    '/platform/feature-classification'
                                                )
                                            }
                                        >
                                            前往体验
                                            <ArrowRightOutlined />
                                        </Button>
                                    </Paragraph>
                                </Typography>
                            </Col>
                            <Col span={10}>
                                <img src={featureImg1} alt="about-4" />
                            </Col>
                        </Row>
                    </div>
                </section>
            </Content>
            <Footer className="rs-footer">
                Remote Sensing ©2022 Created by 冲它吖的！
            </Footer>
        </Layout>
    );
};

export default Home;
