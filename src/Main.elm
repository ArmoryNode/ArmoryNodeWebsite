module Main exposing (main)

import Browser
import Html exposing (Html, a, div, i, main_, nav, span)
import Html.Attributes exposing (attribute, class, href, id)
import Html.Events exposing (onClick)


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initModel
        , update = update
        , view = view
        }


initModel : Model
initModel =
    { darkMode = False }


type Msg
    = ToggleDarkMode


type alias Model =
    { darkMode : Bool }


update : Msg -> Model -> Model
update msg model =
    case msg of
        ToggleDarkMode ->
            { model | darkMode = not model.darkMode }


navLink : String -> String -> String -> String -> Html msg
navLink bgColor link iconClass linkText =
    div [ class "nav-link-wrapper" ]
        [ a [ class ("nav-link " ++ bgColor), href link ]
            [ div [ class "icon-container" ]
                [ i [ class iconClass, attribute "aria-hidden" "true" ] [] ]
            , div [ class "link-body" ] [ Html.text linkText ]
            , div [ class "link-icon" ] []
            ]
        ]


themeToggle : Html Msg
themeToggle =
    div [ id "themeToggle", onClick ToggleDarkMode ]
        [ span [ id "themeToggleIcon", attribute "aria-hidden" "true" ] [] ]


profile : Html msg
profile =
    div [ id "profile" ] [ div [ class "profile-image" ] [] ]


navItems : Html msg
navItems =
    nav []
        [ navLink "bg-green" "https://www.instagram.com/armorynode/" "fa-brands fa-fw fa-instagram fa-2x" "Instagram"
        , navLink "bg-red" "https://www.flickr.com/photos/armorynode/" "fa-brands fa-fw fa-flickr fa-2x" "Flickr"
        , navLink "bg-blue" "https://www.github.com/armorynode" "fa-brands fa-fw fa-square-github fa-2x" "GitHub"
        , navLink "bg-grey" "https://ko-fi.com/armorynode" "fa-solid fa-fw fa-cup-togo fa-2x" "Buy me a coffee"
        ]


view : Model -> Html Msg
view model =
    div [ id "wrapper", class (if model.darkMode then "dark" else "") ]
        [ themeToggle
        , main_ []
            [ profile
            , navItems
            ]
        ]
