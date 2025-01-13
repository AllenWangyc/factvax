import { Typography, Card, Button } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import "./result.styl";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { historyFetchByIDAPI } from "@/apis";

const Result = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecord() {
      try {
        setLoading(true);
        const response = await historyFetchByIDAPI(id);
        setRecord(response.historyRecord);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecord();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!record) {
    return <div>No data found for ID: {id}</div>;
  }

  const { text, result = {}, source, created_at, vax_type } = record;
  const { classification = "unknown", confidence, correction, message, vaccine_type } = result;

  // Dynamic render icon and char colour
  const renderStatus = (classification) => {
    if (classification === "accurate") {
      return (
        <>
          <CheckCircleTwoTone className="credible-icon" twoToneColor="#6acc39" />
          <span className="result-status credible">Credible</span>
        </>
      );
    } else if (classification === "misinformation") {
      return (
        <>
          <CloseCircleTwoTone className="credible-icon" twoToneColor="#ff4d4f" />
          <span className="result-status misinformation">Misinformation</span>
        </>
      );
    } else if (classification === "unrelated") {
      return (
        <>
          <CheckCircleTwoTone className="credible-icon" twoToneColor="#ffcc00" />
          <span className="result-status unrelated">Unrelated</span>
        </>
      );
    } else {
      return (
        <>
          <CheckCircleTwoTone className="credible-icon" twoToneColor="#d3d3d3" />
          <span className="result-status unknown">Unknown</span>
        </>
      );
    }
  };

  return (
    <div className="P-result">
      <div className="page-container">
        <div className="header">
          <div className="title-wrapper">
            <Title className="title" level={1}>
              Detection Result
            </Title>
          </div>
          <div className="subtitle-wrapper">
            <Title className="subtitle" level={5}>
              Below are the analysis results for ID: {id}
            </Title>
          </div>
        </div>
        <div className="result-section-wrapper">
          <Card className="result-card">
            <div className="result-content">
              <div className="detection-text-wrapper">
                <Title className="detection-text-title" level={4}>
                  Detected Text
                </Title>
                <span className="detection-text">{text || "N/A"}</span>
              </div>

              <div className="result-status-wrapper">
                <Title className="result-status-title" level={4}>
                  Status
                </Title>
                <div className="result-status-content-container">
                  {renderStatus(classification)}
                </div>
              </div>

              {confidence && (
                <div className="result-confidence-wrapper">
                  <Title className="result-confidence-title" level={4}>
                    Confidence
                  </Title>
                  <span className="result-confidence">{(confidence * 100).toFixed(2)}%</span>
                </div>
              )}

              {correction && (
                <div className="result-correction-wrapper">
                  <Title className="result-correction-title" level={4}>
                    Correction
                  </Title>
                  <span className="result-correction">{correction}</span>
                </div>
              )}

              {message && (
                <div className="result-message-wrapper">
                  <Title className="result-message-title" level={4}>
                    Message
                  </Title>
                  <span className="result-message">{message}</span>
                </div>
              )}

              {vaccine_type && (
                <div className="result-vaccine-type-wrapper">
                  <Title className="result-vaccine-type-title" level={4}>
                    Vaccine Type
                  </Title>
                  <span className="result-vaccine-type">{vaccine_type}</span>
                </div>
              )}
            </div>
            <hr className="line" />

            <div className="timestamp-wrapper">
              <span className="timestamp">Timestamp: {created_at}</span>
            </div>
            <div className="detailed-info-item-wrapper">
              <span className="detailed-info-item">Source: {source || "N/A"}</span>
            </div>
          </Card>
        </div>
        <div className="btn-container">
          <Button className="redetect-btn" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;
