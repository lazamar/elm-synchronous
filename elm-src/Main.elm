port module Main exposing (..)

import Html exposing (br)
import Json.Decode
import Native.Transformer


main =
    Html.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


view _ =
    br [] []


type Msg
    = ExposeFunctions


type alias Model =
    ()


type alias PublicAPI =
    { greet : Json.Decode.Value
    , sum : Json.Decode.Value
    , tripleOr : Json.Decode.Value
    }


port expose : PublicAPI -> Cmd msg


port requestExposition : (Json.Decode.Value -> msg) -> Sub msg


init =
    ( (), Cmd.none )


update msg model =
    case msg of
        ExposeFunctions ->
            ( model, expose publicApi )


subscriptions model =
    requestExposition (always ExposeFunctions)


publicApi : PublicAPI
publicApi =
    { greet = toJsFunction greet
    , sum = toJsFunction sum
    , tripleOr = toJsFunction tripleOr
    }


greet : String -> String
greet name =
    "Hello " ++ name ++ "!"


sum : Int -> Int -> Int
sum x y =
    x + y


tripleOr : Bool -> Bool -> Bool -> Bool
tripleOr a b c =
    a || b || c



-- The type is showing a function of arity 1, but toJsFunction accepts
-- functions of any arity


toJsFunction : (a -> b) -> Json.Decode.Value
toJsFunction =
    Native.Transformer.toJsFunction
