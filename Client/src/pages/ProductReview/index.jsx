import { EditOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Progress, Radio, Row, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import './style.scss'
const { Title } = Typography;



// project table start
const project = [
  {
    title: "COMPANIES",
    dataIndex: "name",
    width: "32%",
  },
  {
    title: "BUDGET",
    dataIndex: "age",
  },
  {
    title: "STATUS",
    dataIndex: "address",
  },
  {
    title: "COMPLETION",
    dataIndex: "completion",
  },
];
const dataproject = [
  {
    key: "1",

    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src="https://source.unsplash.com/random/200x200" size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Spotify Version</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$14,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={30} size="small" />
          <span>
            <Link to="/">
              <EditOutlined />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "2",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src="https://source.unsplash.com/random/200x200" size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Progress Track</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$3,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={10} size="small" />
          <span>
            <Link to="/">
              <EditOutlined />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "3",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src="https://source.unsplash.com/random/200x200" size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}> Jira Platform Errors</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">Not Set</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">done</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={100} size="small" format={() => "done"} />
          <span>
            <Link to="/">
              <EditOutlined />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "4",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src="https://source.unsplash.com/random/200x200" size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}> Launch new Mobile App</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$20,600</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">canceled</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress
            percent={50}
            size="small"
            status="exception"
            format={() => "50%"}
          />
          <span>
            <Link to="/">
              <EditOutlined />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "5",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src="https://source.unsplash.com/random/200x200" size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Web Dev</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$4,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={80} size="small" />
          <span>
            <Link to="/">
              <EditOutlined />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "6",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src="https://source.unsplash.com/random/200x200" size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Redesign Online Store</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$2,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">canceled</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={0} size="small" />
          <span>
            <Link to="/">
              <EditOutlined />
            </Link>
          </span>
        </div>
      </>
    ),
  },
];

const ProductsPage = () => {
    
    return (
      <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>

            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Projects Table"
              extra={
                <>
                  <Radio.Group  defaultValue="all">
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="online">ONLINE</Radio.Button>
                    <Radio.Button value="store">STORES</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={project}
                  dataSource={dataproject}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
    );
};

export default ProductsPage;