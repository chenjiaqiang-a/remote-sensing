import { Button, Col, Layout, Row, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import featureImg1 from '../assets/images/feature-01.png';
import featureImg2 from '../assets/images/feature-02.png';
import featureImg3 from '../assets/images/feature-03.png';
import aboutImg1 from '../assets/images/about-1.png';
import aboutImg2 from '../assets/images/about-2.png';
import aboutImg3 from '../assets/images/about-3.png';
import aboutImg4 from '../assets/images/about-4.png';

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
                            AI赋能，打造多功能遥感影像分析处理平台，智能解析遥感图像，带给用户直观、便捷的使用体验
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
                                Remote Sensing
                                作为一个基于深度学习的遥感图像分析平台，基于智能、便捷、直观的设计理念，希望带给感兴趣的同学和科研工作者更加满意的体验。
                            </Paragraph>
                        </Typography>
                        <Row gutter={16}>
                            <Col span={8}>
                                <img src={featureImg1} alt="feature-1" />
                                <Typography style={{ textAlign: 'center' }}>
                                    <Title level={3}>智能</Title>
                                    <Paragraph>
                                        使用最新的遥感图像分析的深度学习模型，经由
                                        PaddlePaddle 平台和 PaddleRS
                                        遥感算法包训练以及部署，得到可靠而智能的模型。
                                    </Paragraph>
                                </Typography>
                            </Col>
                            <Col span={8}>
                                <img src={featureImg2} alt="feature-2" />
                                <Typography style={{ textAlign: 'center' }}>
                                    <Title level={3}>便捷</Title>
                                    <Paragraph>
                                        无需下载安装，直接在网页端即可访问
                                        Remote Sensing
                                        平台，简单地上传遥感图像选择少量参数，便可得到满意的检测结果
                                    </Paragraph>
                                </Typography>
                            </Col>
                            <Col span={8}>
                                <img src={featureImg3} alt="feature-3" />
                                <Typography style={{ textAlign: 'center' }}>
                                    <Title level={3}>直观</Title>
                                    <Paragraph>
                                        平台在遥感图像分析和结果展示时，将原本的图片和检测结果有机地结合，使得用户可以二次定义结果的表现形式，以期达到直观的视觉效果。
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
                                基于深度学习算法，我们的平台可以提供目标提取、变化检测、目标检测、地物分类四大功能，使用直观的展示方法将结果呈现给用户，并允许用户自定义结果的表现，方便进行结果展示。
                            </Paragraph>
                        </Typography>
                        <Row gutter={16} className="about-card">
                            <Col className="about-img" span={10}>
                                <img src={aboutImg1} alt="about-1" />
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
                                        使用图像分割技术对卫星图像中指定对象进行提取，能够快速了解该区域中目标对象的位置区域，为地区的规划建设、农林资源的合理利用提供参考方案。
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
                                        使用图像分割技术对同区域不同时期的卫星图像变化情况完成分析，能够快速获取不同时期该区域的地理变化信息，推测该区域的发展情况，进一步完善城建工作，更新地形测绘，为探究全球宏观问题提供条件。
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
                            <Col className="about-img" span={10}>
                                <img src={aboutImg2} alt="about-2" />
                            </Col>
                        </Row>
                        <Row gutter={16} className="about-card">
                            <Col className="about-img" span={10}>
                                <img src={aboutImg3} alt="about-3" />
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
                                        使用目标检测技术对卫星图像中指定对象完成检测，目前支持对象为操场，后续将针对不同对象进行深入开发。
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
                                        使用图像分割技术对卫星图像每个像素完成分类，能够使用户获取该区域地表组成的大致划分，对该区域的环境质量评价，道路交通分析，土地利用具有重大意义。
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
                            <Col className="about-img" span={10}>
                                <img src={aboutImg4} alt="about-4" />
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
