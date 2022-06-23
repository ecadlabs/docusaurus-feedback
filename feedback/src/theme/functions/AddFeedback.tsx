import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import React from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { BiHappyBeaming, BiMeh, BiSad } from "react-icons/bi";

interface IProps {
  location?: string;
}
interface IState {
  visible: boolean;
}

class AddFeedback extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  async handleSubmit(rating) {
    try {
      await addDoc(collection(db, "ratings"), {
        rating: rating,
        request: window.location.href,
        timestamp: Timestamp.now(),
      });
      this.setState({ visible: false });
    } catch (err) {
      alert(err);
    }
  }

  componentDidUpdate() {}
  componentDidMount() {}

  render() {
    if (this.state.visible === true) {
      return (
        <Container>
          <Alert>
            <Row>
              <Col className="text-center">
                Please provide feedback on this article:
              </Col>
              <Col className="text-center">
                <ButtonGroup size="lg" className="">
                  <Button
                    className="btn-danger"
                    onClick={() => this.handleSubmit(0)}
                  >
                    <BiSad />
                    <span className="p-2">BAD</span>
                  </Button>
                  <Button
                    className="btn-primary"
                    onClick={() => this.handleSubmit(1)}
                  >
                    <BiMeh />
                    <span className="p-2">AVERAGE</span>
                  </Button>
                  <Button
                    className="btn-success"
                    onClick={() => this.handleSubmit(2)}
                  >
                    <BiHappyBeaming />
                    <span className="p-2">GOOD</span>
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Alert>
        </Container>
      );
    } else {
      return (
        <Container>
          <Alert className="text-center">Thank you for the feedback!</Alert>
        </Container>
      );
    }
  }
}
export default AddFeedback;
