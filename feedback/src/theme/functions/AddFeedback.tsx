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
  fixed: boolean;
}

//------------------------------------------------------------//
//--- Change this if you want a different tracking account ---//
//------------------------------------------------------------//
const trackingId = "UA-93014135-3";
ReactGA.initialize(trackingId);
//------------------------------------------------------------//
//------------------------------------------------------------//

class AddFeedback extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: true,
      fixed: false,
    };
    console.log(props);
  }
  details() {}
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
                  className="button  margin--sm good"
                  onClick={() => this.handleSubmit(2)}
                >
                  <BiHappyBeaming size={40} />
                </button>
                <button
                  className="button margin--sm average"
                  onClick={() => this.handleSubmit(1)}
                >
                  <BiMeh size={40} />
                </button>
                <button
                  className="button  margin--sm bad"
                  onClick={() => this.handleSubmit(0)}
                >
                  <BiSad size={40} />
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
            <button
              className="button  margin--sm bad"
              onClick={() => this.details()}
            >
              Leave detailed feedback
            </button>
          </div>
        </div>
      );
    }
  }
}
export default AddFeedback;
