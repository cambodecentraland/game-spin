import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import cors from "cors";

import express, { Request, Response } from 'express'
import dcl, { express as dclExpress } from 'decentraland-crypto-middleware'

import { runChecks } from './security/securityChecks'
import { VALID_SIGNATURE_TOLERANCE_INTERVAL_MS, Metadata } from './utils'

import { doc, getDoc, getDocs, setDoc, updateDoc } from '@firebase/firestore'
import { usersCol } from "./database/useDb";

export const VALID_PARCEL: number[] = [1, 1]

/**
 * Import your Room files
 */
import { MyRoom } from "./rooms/MyRoom";

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('my_room', MyRoom);

    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */

         app.use(cors({ origin: true }))

         app.get(
            '/check-validity',
            dclExpress({ expiration: VALID_SIGNATURE_TOLERANCE_INTERVAL_MS }),
            async(req:Request & dcl.DecentralandSignatureData,res: Response) => {
              const address: string | undefined = req.auth
              const metadata: Record<string, any> | undefined = req.authMetadata

              console.log('addres : ',address);
              console.log('metadata : ',metadata);

              const singleUserDocRef = doc(usersCol, address)

              const singleUserDoc = await getDoc(singleUserDocRef)
              const singleUser = singleUserDoc.data()
              let score = 0
              if (singleUser) {
                console.log(singleUser.userId)
                score = singleUser.score
              }  
              else{
                await setDoc(singleUserDocRef, {
                  userId : address,
                  name:address,
                  score:0
                })
              }

              {
                    try {
                        await runChecks(req, VALID_PARCEL)
                        return res.status(200).send({ valid: true, msg: 'Valid request',total_score:score })
                    } catch (error) {
                        console.log(error)
                        return res
                        .status(400)
                        .send({ valid: false, error: `Can't validate your request` })
                    }
             }
            }
          )

            /*
         app.get(
            '/check-validity',
            dclExpress({ expiration: VALID_SIGNATURE_TOLERANCE_INTERVAL_MS }),
            async (
              req: Request & dcl.DecentralandSignatureData<Metadata>,
              res: Response
            ) => {
              try {
                await runChecks(req, VALID_PARCEL)
                return res.status(200).send({ valid: true, msg: 'Valid request' })
              } catch (error) {
                console.log(error)
                return res
                  .status(400)
                  .send({ valid: false, error: `Can't validate your request` })
              }
            }
          )
         */
        app.get("/", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});