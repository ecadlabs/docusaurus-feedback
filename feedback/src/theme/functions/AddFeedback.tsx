import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import React from "react";
import { BiHappyBeaming, BiMeh, BiSad } from "react-icons/bi";
import ReactGA from "react-ga";
import "@site/src/theme/feedback.css";

interface IProps {
  location?: string;
}
interface IState {
  visible: boolean;
}
const trackingId = "UA-93014135-3";
ReactGA.initialize(trackingId);

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
      ReactGA.event({
        category: "FEEDBACK",
        action: rating,
        label: rating,
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
        <div className="container margin-top--lg padding--none">
          <div className="alert alert--primary" role="alert">
            <div className="row">
              <div className="col text--center">
                Please provide feedback on this article:
                <button
                  className="button button--outline button--danger  margin--sm"
                  onClick={() => this.handleSubmit(0)}
                >
                  <BiSad />
                  <span className="padding--md">BAD</span>
                </button>
                <button
                  className="button button--outline button--warning  margin--sm"
                  onClick={() => this.handleSubmit(1)}
                >
                  <BiMeh />
                  <span className="padding--md">AVERAGE</span>
                </button>
                <button
                  className="button button--outline button--success  margin--sm"
                  onClick={() => this.handleSubmit(2)}
                >
                  <BiHappyBeaming />
                  <span className="padding--md">GOOD</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container margin-top--lg padding--none text--center">
          <div className="alert alert--primary" role="alert">
            Thank you for the feedback!
          </div>
        </div>
      );
    }
  }
}
export default AddFeedback;
