port module Main exposing (main)

import Browser
import Html exposing (Html, a, button, div, footer, i, main_, nav, span, img)
import Html.Attributes exposing (attribute, class, href, id, src)
import Html.Events exposing (onClick)


main : Program Flags Model Msg
main =
    Browser.element
        { init = initModel
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


port sendDarkModeSetting : Bool -> Cmd msg
port replayAnimations : () -> Cmd msg


initModel : Flags -> ( Model, Cmd Msg )
initModel flags =
    ( { darkMode = flags.darkModeEnabled, year = flags.currentYear }, Cmd.none )


type Msg
    = ToggleDarkMode
    | ReplayAnimations


type alias Flags =
    { currentYear : Int
    , darkModeEnabled : Bool
    }


type alias Model =
    { darkMode : Bool
    , year : Int
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ToggleDarkMode ->
            let
                darkModeEnabled =
                    not model.darkMode
            in
            ( { model | darkMode = darkModeEnabled }, sendDarkModeSetting darkModeEnabled )
        ReplayAnimations ->
            ( model, replayAnimations () )


icon : String -> Html Msg
icon class_ =
    i [ class class_, attribute "aria-hidden" "true" ] []


navLink : String -> String -> String -> String -> Html Msg
navLink bgColor link iconClass linkText =
    div [ class "nav-link-wrapper" ]
        [ a [ class ("nav-link " ++ bgColor), href link ]
            [ div [ class "icon-container" ]
                [ icon iconClass ]
            , div [ class "link-body" ] [ Html.text linkText ]
            , div [ class "link-icon" ] []
            ]
        ]


themeToggle : Html Msg
themeToggle =
    button [ id "themeToggle", onClick ToggleDarkMode ]
        [ span [ id "themeToggleIcon", attribute "aria-hidden" "true" ] [] ]


profile : Html Msg
profile =
    div [ id "profile", onClick ReplayAnimations ]
        [ img [ src "./images/profile.png", class "profile-image" ] [] ]


navItems : Html Msg
navItems =
    nav []
        [ navLink "bg-green" "https://www.instagram.com/armorynode/" "fa-brands fa-fw fa-instagram fa-2x" "Instagram"
        , navLink "bg-red" "https://www.flickr.com/photos/armorynode/" "fa-brands fa-fw fa-flickr fa-2x" "Flickr"
        , navLink "bg-blue" "https://www.github.com/armorynode" "fa-brands fa-fw fa-square-github fa-2x" "GitHub"
        , navLink "bg-grey" "https://ko-fi.com/armorynode" "fa-solid fa-fw fa-cup-togo fa-2x" "Buy me a coffee"
        ]


siteFooter : Model -> Html Msg
siteFooter model =
    footer [ id "footer" ]
        [ div [ class "footer-content" ]
            [ div [ class "footer-text" ]
                [ Html.text ("© " ++ String.fromInt model.year ++ " ArmoryNode") ]
            ]
        ]


view : Model -> Html Msg
view model =
    div
        [ id "wrapper"
        , class
            (if model.darkMode then
                "dark"

             else
                ""
            )
        ]
        [ themeToggle
        , main_ []
            [ profile
            , navItems
            ]
        , siteFooter model
        ]
