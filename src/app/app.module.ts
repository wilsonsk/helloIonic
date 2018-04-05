import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

// Boilerplate Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';

// Login App Pages
import { LoginPage } from '../pages/login/login';
import { SchedulePage } from '../pages/schedule/schedule';
import { TripDetailsPage } from '../pages/trip-details/trip-details';

// Quote App Pages
import { QuotesPage } from '../pages/quotes/quotes';
import { QuotePage } from '../pages/quotes/quote/quote';
import { LibraryPage } from '../pages/quotes/library/library';
import { FavoritesPage } from '../pages/quotes/favorites/favorites';
import { SettingsPage } from '../pages/quotes/settings/settings';
import { TabsPage } from '../pages/quotes/tabs/tabs';

// Components Indepth App Pages
import { ComponentsIndepthPage } from '../pages/components-indepth/components-indepth';
import { ButtonsPage } from '../pages/components-indepth/buttons/buttons';
import { ListsPage } from '../pages/components-indepth/lists/lists';
import { GridsPage } from '../pages/components-indepth/grids/grids';
import { GesturesPage } from '../pages/components-indepth/gestures/gestures';
import { CustomComponentPage } from '../pages/components-indepth/custom-component/custom-component';

// Code Game Page
import { CodeGamePage } from '../pages/code-game/code-game';

// Recipes App Pages
import { RecipesPage } from '../pages/recipes/recipes';
import { RecipePage } from '../pages/recipes/recipe/recipe';
import { ShoppingListPage } from '../pages/recipes/shopping-list/shopping-list';
import { RecipesTabsPage } from '../pages/recipes/recipes-tabs/recipes-tabs';
import { ManageRecipePage } from '../pages/recipes/manage-recipe/manage-recipe';
import { SigninPage } from '../pages/recipes/signin/signin';
import { SignupPage } from '../pages/recipes/signup/signup';
import { ShoppingListOptionsPage } from '../pages/recipes/shopping-list/shopping-list-options/shopping-list-options';
import { RecipesOptionsPage } from '../pages/recipes/recipes-options/recipes-options';

// Places App Pages
import { PlacesPage } from '../pages/places/places';
import { PlacePage } from '../pages/places/place/place';
import { AddPlacePage } from '../pages/places/add-place/add-place';
import { SetLocationPage } from '../pages/places/set-location/set-location';

// Angular GMAPS
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';

// Custom Components - Loaded in declarations only.
// - WARNING - NOT LOADED IN entryComponents
// - LOAD INSIDE A PAGE'S .html view
import { TouchEventComponent } from '../components/touch-event/touch-event.component';

// Services
import { UserService } from '../services/user';
import { FavoritesService } from '../services/favorites';
import { SettingsService } from '../services/settings';
import { ShoppingListService } from '../services/shopping-list';
import { RecipesService } from '../services/recipes';
import { AuthService } from '../services/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SchedulePage,
    TripDetailsPage,
    QuotesPage,
    QuotePage,
    LibraryPage,
    FavoritesPage,
    SettingsPage,
    TabsPage,
    ComponentsIndepthPage,
    ButtonsPage,
    ListsPage,
    GridsPage,
    GesturesPage,
    TouchEventComponent,
    CustomComponentPage,
    CodeGamePage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    RecipesTabsPage,
    ManageRecipePage,
    SigninPage,
    SignupPage,
    ShoppingListOptionsPage,
    RecipesOptionsPage,
    PlacesPage,
    PlacesPage,
    PlacePage,
    AddPlacePage,
    SetLocationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAXKhOyTdJ_OKgiKstevkd2wU_wEWnLmV0'
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SchedulePage,
    TripDetailsPage,
    QuotesPage,
    QuotePage,
    LibraryPage,
    FavoritesPage,
    SettingsPage,
    TabsPage,
    ComponentsIndepthPage,
    ButtonsPage,
    ListsPage,
    GridsPage,
    GesturesPage,
    CustomComponentPage,
    CodeGamePage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    RecipesTabsPage,
    ManageRecipePage,
    SigninPage,
    SignupPage,
    ShoppingListOptionsPage,
    RecipesOptionsPage,
    PlacesPage,
    PlacesPage,
    PlacePage,
    AddPlacePage,
    SetLocationPage
  ],
  providers: [
    UserService,
    FavoritesService,
    SettingsService,
    ShoppingListService,
    RecipesService,
    AuthService,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
