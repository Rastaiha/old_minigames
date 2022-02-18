import React, { useEffect, useState } from 'react';
import { Button, Label, Input } from 'semantic-ui-react';
import {
  createAuction,
  joinAuction,
  restartAuction,
  bid as bidAction,
  getResult,
} from '../../../redux/actions/auction';
import { connect } from 'react-redux';

function toFinish({ response_time, remained_time }) {
  return (
    remained_time + (response_time.getTime() - new Date().getTime()) / 1000
  );
}

function isAlive({ response_time, remained_time }) {
  return toFinish({ response_time, remained_time }) > 0;
}

function Auction({
  createAuction,
  joinAuction,
  values,
  team_id,
  auction_pay_type,
  delta,
  params,
  bidAction,
  restartAuction,
  getResult,
  result,
}) {
  const [finish, setFinish] = useState(0);
  const [bid, setBid] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (params.auction) {
        if (
          isAlive({
            response_time: params.response_time,
            remained_time: params.auction.remained_time,
          })
        ) {
          setFinish(
            toFinish({
              response_time: params.response_time,
              remained_time: params.auction.remained_time,
            })
          );
        } else if (!result.auction) {
          getResult();
        }
      }
    }, 1000);
  });
  return (
    <div>
      <Label
        attached="top"
        style={{ textAlign: 'center', fontSize: 25 }}
        primary
      >
        مزایده
      </Label>

      <div
        style={{
          paddingTop: 20,
          display: 'flex',
          alignItem: 'center',
          justifyContent: 'center',
        }}
      >
        {params.auction ? (
          <div style={{ direction: 'rtl', textAlign: 'center', margin: 30 }}>
            <Button icon="undo" onClick={restartAuction} floated="left" />
            <div style={{ float: 'right' }}>
              مزایده شماره: {params.auction.id}
            </div>
            <br />
            <br />
            <br />
            <div>پایان: {finish + 'ثانیه دیگر '}</div>
            <div>ارزش محصول برای من: {params.my_value}</div>
            <Input
              label="قیمت پیش‌نهادی من"
              type="number"
              min={0}
              max={0}
              value={bid}
              disabled={params.submited || result.bidders || finish <= 1}
              onChange={(e, { value }) => setBid(value)}
            />
            <Button
              primary
              disabled={params.submited || result.bidders || finish <= 1}
              onClick={
                params.submited || result.bidders || finish <= 1
                  ? () => {}
                  : () => bidAction({ bid, auction: params.auction.id })
              }
            >
              ثبت
            </Button>
            {result.bidders ? (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {result.bidders.map((bidder) => (
                  <div
                    style={{
                      background: '#35be32',
                      color: 'white',
                      padding: '5px 10px',
                      height: 44,
                      margin: '5px',
                      lineHeight: '17px',
                    }}
                  >
                    <div>ارزش: {bidder.value}</div>
                    <div>قیمت پیشنهادی: {bidder.bid}</div>
                    <br />
                    <br />
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <>
            <Button
              primary
              style={{ marginTop: 80 }}
              onClick={() =>
                createAuction({
                  values,
                  auction_pay_type,
                })
              }
            >
              ساخت مزایده
            </Button>
            <Button
              primary
              style={{ margin: '80px 5px 0' }}
              onClick={() => joinAuction()}
            >
              اضافه شدن به مزایده
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  team_id: state.account.user.team_id,
  params: state.auction.params,
  result: state.auction.result,
});

export default connect(mapStateToProps, {
  createAuction,
  joinAuction,
  restartAuction,
  bidAction,
  getResult,
})(Auction);
